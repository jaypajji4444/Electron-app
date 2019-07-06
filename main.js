const electron=require("electron");
const url=require("url");
const path=require("path");
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;
const Menu=electron.Menu;
const ipcMain=electron.ipcMain;



// set ENV

process.env.NODE_ENV="production";


let mainWindow;
let addWindow;

// listen for app to be ready


app.on("ready",()=>{
    // create new window

    mainWindow=new BrowserWindow({webPreferences:{nodeIntegration:true}});
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,"/mainWindow.html"),
        protocol:"file",
        slashes:true
    }));


    // Quit app on closed

    mainWindow.on("closed",()=>{
        app.quit();
    })
        

});




    // creating the window to add items

    
function createAddWindow()
{
    addWindow=new BrowserWindow
    ({
        width:400,
        height:200,
        title:"AddShoppingList",
        webPreferences:{nodeIntegration:true}
    });
    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,"/addWindow.html"),
        protocol:"file",
        slashes:true
    }));

     // garbage colection handler

     addWindow.on("closed",()=>{
     addWindow=null;
     })

}

///================================================ co000l event handler...............................................................

ipcMain.on("cool",(event,data)=>{

    event.preventDefault();
    var list=data;
    console.log("data:",data);
  
    createAddWindow();
    console.log(addWindow);
    console.log(ipcMain)
    ipcMain.emit("jay");
    addWindow.webContents.send("jay",data);
   
})




//  catch item:addd
ipcMain.on("item:add",(event,item)=>{
    
    mainWindow.webContents.send("item:add",item); // sendinf data from addwindow to mainwindow now catch it in main window 
    addWindow.close();
})