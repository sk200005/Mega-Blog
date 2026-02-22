import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";
//Client → connects your app to Appwrite server
//Account → handles authentication (login, signup, session, logout)

export class AuthService {

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

    async getCurrentUser (){
        try {
            return  await this.account.get();
        } catch (error) {
            console.log ("Appwritr error :: getCurrentUser :" + error)
        }

        return null;
    }

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