#!/usr/bin/env node
import  prompt  from "enquirer"
console.log("Welcome to Rover")
console.log("A wrapper on Cloudflare worker!")

async function getProjectName() {
    const inputResponse =  await prompt({
        "type": "input",
        "name": "xxx",
        message: "Project name: ",
        validate: (value)=> {
            return value? true: "Project name is required!"
        }
    })

    return inputResponse.options

}

async function cli(){
    const projectName= await getProjectName()
    console.log(projectName);
    
}

cli()



