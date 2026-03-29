// ************************* Functionalities related to Posts ******************************
// Appwrite Database Connections

import conf from "../conf/conf.js";
import { Client, ID, Storage, Query, TablesDB } from "appwrite";

export class Service {
    client;
    tables;              // All three will be defined inside the constructor 
    bucket;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.tables = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tables.createRow({
                databaseId: conf.appwriteDatabaseId,    
                tableId: conf.appwriteTableId,   // renamed
                rowId: ID.unique(),              // Use a valid Appwrite row ID regardless of title length
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        } catch (error) {
            console.log("Appwrite error :: createPost :", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
            try {
                return await this.tables.updateRow({
                    databaseId: conf.appwriteDatabaseId,  //Databse ID
                    tableId: conf.appwriteTableId,        //Table ID
                    rowId: slug,                          //RowID of the row to update
                    data: {                               //What to update
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
                });
        
            } catch (error) {
                console.log("Appwrite error :: updatePost :", error);
            }
    }

    async deletePost(slug){
        try {
             await this.tables.deleteRow({ 
                databaseId: conf.appwriteDatabaseId,   //Database ID
                tableId: conf.appwriteTableId,         //Table ID
                rowId: slug,                           // RowID of the row to delete
            })
            return true 
        } catch (error) {
            console.log("Appwrite error :: deletePost :", error);
            return false
        }
    }

    async getPost (slug){
        try {
            return await this.tables.getRow({
                databaseId: conf.appwriteDatabaseId, //DatabseID
                tableId: conf.appwriteTableId,       //TableID
                rowId: slug,                         // RowID of row to fetch
            }) 
        } catch (error) {
            console.log("Appwrite error :: getPost :", error);
            return null
        }
    }

    async getPosts (queryParam = [Query.equal("status", "active")]){  
        try {                   //Query.equal (field  ,    value)
            const response = await this.tables.listRows({
                databaseId: conf.appwriteDatabaseId,   //DatabseID
                tableId: conf.appwriteTableId,         //TableID
                queries : queryParam,                  //Query to filter the rows
                
            })

            return response?.rows || response?.documents || []
        } catch (error) {
            console.log("Appwrite error :: getPosts :", error);
            return []
        }
    }

//-------------------------> File Methods <----------------------------------
    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId : conf.appwriteBucketId,  // StorageID tell where to store
                fileId : ID.unique(),              // unique ID for each file
                file : file                        // actual file
            })
        } catch (error) {
            console.log("Appwrite error :: uploadFile :", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile({
                bucketId : conf.appwriteBucketId,
                fileId : fileId,
            })
        } catch (error) {
            console.log("Appwrite error :: uploadFile :", error);
            return false
        }
    }

    getFilePreview(fileId)
    {
        if (!fileId) return "";

        return this.bucket.getFileView({
            bucketId : conf.appwriteBucketId,
            fileId : fileId,
        })
    }
}

const service = new Service();
export default service
