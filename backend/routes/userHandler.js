import UsersModel from "../model/usermodel.js";
import connectMongoDB from "../model/mongodbconnect.js";

export const CreateUsers = async (req, res) => {
  const {
    title,
    firstName,
    surName,
    otherName,
    email,
    phoneNumber,
    address,
    LGA,
    year,
  } = req.body;

  try {
    await connectMongoDB();
    const ExistingUser = await UsersModel.findOne({ email: email });
    if (ExistingUser) {
      return res.json(
        {
          message: "User Info Already Exists",
          success: false,
        },
        { status: 404 }
      );
    } else {
      if (firstName === "onyekachi" && email === "onyekachiogwo@yahoo.com") {
        const userRole = "ADMIN";
        const data = {
          title,
          firstName,
          surName,
          otherName,
          email,
          phoneNumber,
          address,
          LGA,
          year,
          userRole: userRole,
        };
        const user = await UsersModel.create(data);
        const results = await user.save();
        return res.json(
          {
            message: "User Created Successfully",
            success: true,
            users: results,
          },
          { status: 201 }
        );
      } else {
        const userRole = "USER";
        const data = {
          title,
          firstName,
          surName,
          otherName,
          email,
          phoneNumber,
          address,
          LGA,
          year,
          userRole: userRole,
        };
        const user = await UsersModel.create(data);
        const results = await user.save();
        return res.json(
          {
            message: "User Created Successfully",
            success: true,
            users: results,
          },
          { status: 201 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return res.json(
      {
        message: `Server Error: ${error.message}`,
        success: false,
      },
      { status: 404 }
    );
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const Users = await UsersModel.find({});

    if (Users.length === 0) {
      return res.json(
        {
          message: `Empty User Collection`,
          success: false,
        },
        { status: 404 }
      );
    }

    return res.json(
      {
        message: "Gotten AllUsers Succssfully",
        success: true,
        users: Users,
      },
      { status: 200 }
    );
  } catch (error) {
    return res.json(
      {
        message: `Server Error: ${error.message}`,
        success: false,
      },
      { status: 404 }
    );
  }
};

export const UpdateUsers = async (req, res) => {
  const { email, userRole } = req.body;
  const { id } = req.params;

  try {
    const ExistingUser = await UsersModel.findOne({ email: email });
    if (ExistingUser) {
      const user = await UsersModel.findByIdAndUpdate(
        { _id: id },
        {
          userRole: userRole,
        }
      );

      return res.json(
        {
          message: "Has been Updated To Admin",
          success: true,
          user: user,
        },
        { status: 201 }
      );
    } else {
      return res.json(
        {
          message: "User Does Not Exist",
          success: false,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return res.json(
      {
        message: `Server Error: ${error.message}`,
        success: false,
      },
      { status: 404 }
    );
  }
};

export const EachUsers = async (req, res) => {
  const { id, email } = req.params;

  try {
    const ExistingUser = await UsersModel.findOne({ email: email });
    if (ExistingUser) {
      const user = await UsersModel.findById({ _id: id });

      return res.json(
        {
          message: "Getting User Info succssfully",
          success: true,
          user: user,
        },
        { status: 201 }
      );
    } else {
      return res.json(
        {
          message: "User Does Not Exist",
          success: false,
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return res.json(
      {
        message: `Server Error: ${error.message}`,
        success: false,
      },
      { status: 404 }
    );
  }
};
