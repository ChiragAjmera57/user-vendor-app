const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const connectToMongoDB = require('./config/config');
const User = require('./modal/user.modal');
const Vendor = require('./modal/vender.modal');
const authenticateUser = require('./middleware/user.auth');
const Link = require('./modal/link.modal');
const authenticateVendor = require('./middleware/vendor.auth');
const UserToUser = require('./modal/VenderOffer');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('uploads'));
app.use(express.json()); 
app.use(cors()) 
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });
 
app.listen(port, () => {
  connectToMongoDB()

  console.log(` is running on port ${port}`);
});

  
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const uniqueFileName = req.file.filename;
  res.json({ downloadLink: `/download/${uniqueFileName}` });
});

app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  res.download(filename, (err) => { 
    if (err) {
      res.status(404).send('File not found.');
    }
  });
});



app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    
    res.status(201).json({ msg:`user registerd succesfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});





app.post('/vendor/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the vendor with the provided email already exists
    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor with this email already exists.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new vendor
    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
    });

    // Save the vendor to the database
    await newVendor.save();

    res.status(201).json({ message: 'Vendor account created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, 'CHIRAG57', { expiresIn: '20d' });

    // Return the token to the client
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
 

// Route for Vendor login
app.post('/vendor/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the vendor with the provided email exists
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, vendor.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ vendorId: vendor._id }, 'CHIRAG24', { expiresIn: '20d' });

    // Return the token to the client
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});




app.get('/search-vendor', authenticateUser, async (req, res) => {
  const { vendorEmail } = req.query; // Assuming the user sends the vendor's email in the query string

  try {
    // Find the vendor with the provided email
    const vendor = await Vendor.findOne({ email: vendorEmail });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }

    // Return the vendor's information
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


app.post('/add-vendor', authenticateUser, async (req, res) => {
  const { vendorEmail } = req.body; // Assuming the user sends the vendor's email in the request body

  try {
    // Find the user by their ID from the authentication middleware
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the vendor by their email
    console.log(vendorEmail);
    const vendor = await Vendor.findOne({ email: vendorEmail });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' });
    }

    // Add the vendor to the user's list
    user.vendors.push(vendor._id);
    await user.save();

    // Also, add the user to the vendor's list (if needed)
    vendor.users.push(user._id);
    await vendor.save();

    res.status(200).json({ message: 'Vendor added to your list.',vendor });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
app.get('/toselfVendor',authenticateVendor,async(req,res)=>{
  try {
    const vendorId = req.vendor;
    const result = await Vendor.findOne({_id:vendorId})
    if(!result){
      res.status(404).json({ message: 'Vendor not found.' });
    }
    res.send(result)
  } catch (error) {
    res.send({msg:`something went wront`})
  }
})

app.get('/user/vendors', authenticateUser ,async (req, res) => {
  try {
    // Get the user ID from the authentication middleware (you should have this in your middleware)
    const userId = req.user.userId;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Get the list of vendor IDs from the user's vendor list
    const vendorIds = user.vendors;

    // Find the vendor documents based on the IDs
    const vendors = await Vendor.find({ _id: { $in: vendorIds } });

    res.status(200).json({ vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});




app.post('/send-data', authenticateUser, async (req, res) => {
  const { vendors, downloadLink, productName, quantity, dateOfShipping } = req.body;

  try {
    // Find the user by their ID from the authentication middleware
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the vendors by their IDs
    const selectedVendors = await Vendor.find({ _id: { $in: vendors } });

    if (selectedVendors.length !== vendors.length) {
      return res.status(400).json({ message: 'One or more vendors not found.' });
    }

    // Create a new link
    const link = new Link({
      user: user._id,
      vendors: selectedVendors.map((vendor) => vendor._id),
      downloadLink,
      productName,
      quantity,
      dateOfShipping,
    });

    await link.save();
    
    res.status(200).json({ message: 'Data sent to selected vendors.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
// Route for viewing data and interacting with schedules
app.get('/api/vendor/dashboard', authenticateVendor, async (req, res) => {
  try {
    const vendorId = req.vendor;

    // Use $in to find links where vendorId is in the vendors array
    const result = await Link.find({ vendors: { $elemMatch: { $eq: vendorId } } });

    // Check if there are no results
    if (result.length === 0) {
      return res.status(404).json({ message: 'No data found for this vendor.' });
    }

    res.status(200).json({ message: 'Vendor dashboard data', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
app.post('/send-data-vendor', authenticateVendor, async (req, res) => {
  const { userId, productName, quantity, dateOfShipping, schedule1, schedule2, schedule3 } = req.body;
  const vendorId = req.vendor._id; // Get the vendor's ID from the authentication middleware

  try {
    // Create a new user-to-user data entry
    const userToUserEntry = new UserToUser({
      userId,
      vendorId,
      productName,
      quantity,
      dateOfShipping,
      shippingDatesFromVendor: {
        schedule1,
        schedule2,
        schedule3,
      },
    });
    // Save the data entry to the database
    await userToUserEntry.save();

    res.status(200).json({ message: 'Data sent from vendor to user.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});
app.get('/user-to-user-data',authenticateUser, async (req, res) => {

  // Decode the token to get the user's ID (replace with your token decoding logic)
  const userId = req.user.userId

  try {
    // Use a MongoDB query to find user-to-user data for the matching user ID
    const userToUserData = await UserToUser.find({ userId });

    // Send the user-to-user data as a JSON response
    res.json(userToUserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});






