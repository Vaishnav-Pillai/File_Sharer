var File = require('../db/db');
const { ObjectId } = require('mongodb');
const path = require('path');

function isEmptyList(obj){
    return(!obj || obj.length == 0 || Object.keys(obj).length == 0);
}

function handleError(res,error){
    res.status(500);
    res.send('Something went wrong. \n'+error);
}

module.exports.create = function(req,res){

    const fileObj = {
        path: req.file.path,
        name: req.file.originalname
    }
    
    try{

        // var provider = req.body;

        File.create(fileObj)
            .then( result => {
                res.status(201)
                // res.send('Added'+result);
                const value = JSON.stringify(result);
                console.log(value);
                res.send(result);
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.readOne = async function(req,res){
    
    try{
        const value = await File.findById(req.params.id);
        // var file = fs.readFileSync(__dirname + '/../../uploads/d675f195e34d6d7fc846cf433f7c9f89', 'binary');
        // res.setHeader('Content-Length', file.length);
        // res.write(file, 'binary');
        // console.log(value);
        // res.end();
        // res.attachment(file.path).send();
        // res.send(file);
        // File.find({'_id':new ObjectId(req.params.id)})
        //     .then( result => {
        //         if(isEmptyList(result)){
        //             res.status(400);
        //             res.send("List is Empty.");
        //         }
        //         // result[0].downloadContent++;
        //         console.log(result);
        //         // const file = `${__dirname}/../../uploads/d675f195e34d6d7fc846cf433f7c9f89`
        //         const filePath = `../controller/../Backend/../uploads/download (1).jpg`;
        //         res.attachment(filePath).send();
        //         // res.send(result);
        //         // result.save();
        //         // res.download(file);
                
        //     })
        //     .catch(error => handleError(res,error))

        // var dir = 'C:\Users\lenovo\Desktop\File-Sharer\Backend\api';
        const options = {
            root: path.join(__dirname+'/uploads')
        };

        const name = value.path.slice(23);
        console.log(name);

        const fileName = name;
        res.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sent:', fileName);
            }
        });
    }
    catch(e){
        handleError(res,e)
    }
}

