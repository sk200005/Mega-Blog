//import { data } from "react-router";
import conf from "../conf/conf.js";
import { Client, Account, ID, Databases, Storage, Query, TablesDB } from "appwrite";



export class Service {
    client;
    tables;
    bucket;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            .setKey(conf.appwriteApiKey); // required for backend

        this.tables = new TablesDB(this.client);
        //this.storages = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tables.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,   // renamed
                rowId: slug,
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
                    databaseId: conf.appwriteDatabaseId,
                    tableId: conf.appwriteTableId,
                    rowId: slug,
                    data: {   
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

    async deletePost({slug}){
        try {
             await this.tables.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            })
            return true 
        } catch (error) {
            console.log("Appwrite error :: deletePost :", error);
            return false
        }
    }

    async getPost ({slug}){
        try {
            return await this.tables.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId: slug,
            })
        } catch (error) {
            console.log("Appwrite error :: getPost :", error);
            return false
        }
    }

    async getPosts (queryParam = [Query.equal("status", "active")]){
        try {
            return await this.tables.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries : queryParam,
                
            })
        } catch (error) {
            console.log("Appwrite error :: getPosts :", error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId : conf.appwriteBucketId,
                fileId : ID.unique(),
                file : file
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
        return this.bucket.getFilePreview({
            bucketId : conf.appwriteBucketId,
            fileId : fileId,
        })
    }
}


const service = new Service();
export default service