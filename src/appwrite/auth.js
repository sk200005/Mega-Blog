import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";
//Client → connects your app to Appwrite server
//Account → handles authentication (login, signup, session, logout)

export class AuthService {

    client;
    account; 

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);  
        //Links authentication methods to your configured client
    }

    async createAccount({ email, password, name }){
        try {
            const userAccount = await this.account.create({
            userId: ID.unique(),
            email : email,
            password: password,
            name : name
        });
            if(userAccount)  {
                //another function
                return this.login({email,password})
            }
            else {return userAccount;}
            

        } catch (error) {
            console.log("Appwrite error :: createAccount :", error);
        }
        
        
    }

    async login ({email, password}){
         try {
            return await this.account.createEmailPasswordSession({
                email : email,
                password : password
            })
         } catch (error) {
             console.log("Appwrite error :: login :", error);
         }
    }

    async getCurrentUser (){                    //check who is currently logged
        try {                      
            return  await this.account.get();   //It reads session internally
        } catch (error) {
            console.log ("Appwritr error :: getCurrentUser :" + error) 
        } 
        return null;
    }
    //GetCurrentUser return -->  {
    //  $id: "userId123",
    //  name: "Swayam", 
    // email: "abc@gmail.com",}


    async logout (){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log ("Appwritr error :: logout :" + error)
        }
    }
}


const authService = new AuthService();
export default authService;