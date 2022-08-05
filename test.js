const fs=require('fs');
const greet=function(name){
    console.log(`Hello my name is ${name}`);
}

const people=['abhay','abhishek','ankit'];

/// editing files
const writeFile=fs.writeFile('./textFile1.txt','hello world',()=>{console.log('File was written')});

/// creating directory
const createFolder=fs.mkdir('./docs',function(){
    console.log('folder created');
});
///deleting folders
const deletingFolders=()=>{
    if(fs.existsSync('./docs')){
        fs.rmdir('./docs',(err)=>{
            console.log(err);
        });
        console.log('folder removed');
    }
    else{
        console.log('The folder does not exists');
    }
}


if(fs.existsSync('./textFile1.txt')){
    fs.unlink('./textFile1.txt',(err)=>{console.log(err)});
        console.log('File removed');
    }
    else{
        console.log('The file does not exists');
    }

module.exports={greet,people,writeFile,createFolder,deletionOperation,deletingFolders};
