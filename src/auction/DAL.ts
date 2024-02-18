import jwt from 'jsonwebtoken';
import { Car, CardModel, CarsAuctionModel, User, UserAuctionModel } from '../configuration/mongoSchema';
import fs from 'fs'
export const secretKey = "akiva1132"


export const getAllCarsFromDB = async (advertiser: string) => {
    try {
        const result = await CarsAuctionModel.find({ advertiser: advertiser })
        console.log(result);
        return result
    }
    catch (error) {
        throw error
        console.log(error)
    }
}

export const getAllUsersFromDB = async () => {
    try {
        const result = await UserAuctionModel.find()
        console.log(result);
        return result
    }
    catch (error) {
        throw error
        console.log(error)
    }
}

export const getCarFromDB = async (id: string) => {
    try {
        const result = await CarsAuctionModel.findById(id)
        console.log(result);
        return result
    }
    catch (error) {
        throw error
    }
}


export const insertCar = async (car: Car) => {
    try {
        const newCar = new CarsAuctionModel(car);
        return await newCar.save()
    }
    catch (error) {
        throw error
        console.log(error)
    }
}


export const changePriceDB = async (id: string, price: number) => {
    try {
        if (!id || !price) {
            throw new Error("id or price not accepted ")
        }
        const result = await CarsAuctionModel.findOneAndUpdate(
            { _id: id },
            { $inc: { price: price } },
            { new: true }
        );
        if (!result) throw new Error("car is not exist")
        return result;
    } catch (error) {
        throw error;
    }
};

export const getToken = async (userName: string, password: string) => {
    try {
        const result = await UserAuctionModel.findOne({ userName: userName })
        if (result && result.password === password) {
            console.log(result);
            console.log(result);
            const userId = result._id.toString()
            const isAdmin = result.IsAdamin
            const token = jwt.sign({ userName, password, userId, isAdmin }, secretKey, { expiresIn: '30d' });
            console.log(token);
            return token
        }
        else throw new Error("user not found or password incorrect")
    }
    catch (error) {
        throw error
        console.log(error)
    }
}

export const incrementUserField = async (id: string) => {
    try {
        const updatedUser = await UserAuctionModel.updateOne(
            { _id: id },
            { $inc: { numberAds: 1 } }
        );
        return updatedUser;
    } catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};

export const getNameGetByID = async (id: string) => {
    try {
        console.log(id);
        
        const user = await UserAuctionModel.findById(id).select('fullName');
        console.log(user);
        
        return user?.fullName;
    } catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};


export const deleteCarFromDB = async (id: string, userId: string) => {
    try {
        console.log(id);   
        const result = await CarsAuctionModel.deleteOne({_id:id})
        await UserAuctionModel.updateOne(
            { _id: userId },
            { $inc: { numberAds: -1 } }
        );
        console.log(result);
        if (result.deletedCount){
            return "המודעה נמחקה בהצלחה"    
        }
        else{
            throw new Error("error")
        }

    } catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};


export const AddCodeInDB = async (isAdmin: boolean) => {
    try {
        if(!isAdmin){
            throw new Error("הרשאת ניהול נדרשת")
        }
        const code =  Math.floor(Math.random() * 1000000);
        fs.writeFile('./data.json', JSON.stringify(code), (err) => {
            if (err) {
                throw new Error('אירעה שגיאה בכתיבת הקובץ:' + err.message)
              return;
            }
            console.log(code);
          });
        return code.toString();
    } catch (error) {
        console.error('Error incrementing user field:', error);
        throw error;
    }
};

export const addUser = async (user: User, code:string) => {
    try {
        const isExsist = await UserAuctionModel.findOne({ userName: user.userName })
        if (isExsist) {
            throw new Error("user is exsist")
        }
        const codeFromFile = fs.readFileSync('./data.json');
        console.log(codeFromFile.toString(), code.toString());
        
            if (codeFromFile.toString() !== code.toString()){
                throw new Error("קוד הרשמה אינו תואם")
            }
        user.IsAdamin = false
        if (!user.profileImage) user.profileImage = "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
        const newUser = new UserAuctionModel(user);
        const result = await newUser.save()
        const { userName, password } = user
        const userId = result._id.toString()
        const token = jwt.sign({ userName, password, userId }, secretKey, { expiresIn: '30d' });
        return token;
    }
    catch (error) {
        throw error
        console.log(error)
    }
}
