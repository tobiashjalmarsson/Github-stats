// File for CLI-communication

import { StatsType, CommandInterface, Commands } from "./CommonInterfaces";
console.clear();


import r1 from 'readline-sync';
import { isTypeOfExpression } from "typescript";

function promptUser() : string {
    let answer = r1.question("Please give me an input: ")
    console.log(answer)
    return answer
}

function checkValidity(prompt: string) : Commands | Array<string> {
    const commands : Array<string> = prompt.split(" ")
    if (commands.length == 0) {
        return Commands.Error
    } 
    else if (commands.length == 1) 
    {
        if (!Object.values(Commands).includes(commands[0]))
        {
            return Commands.Error
        } 
    }
    else if (commands.length !== 3)
    {
        return Commands.Error
    }
    return commands
}


function programExecution() : void {
    let running = true
    while(running){
        const userInput = promptUser()
        const validityResult : Commands | Array<String> = checkValidity(userInput)
        
        if(validityResult instanceof Array<string>){
            if (validityResult[0] == StatsType.Quit) {
                // Quit the program
                console.log("Quitting the program")
                running = false
            } else if (validityResult[0] == StatsType.Help){
                // Display help
            } else if (validityResult[0] == StatsType.CommitActivity){
                // Run Commit activity
            }
        } else if (validityResult == Commands.Error) {
            // Display Error
        } 
    }
}

programExecution()

//console.log(Object.values(StatsType).includes(1))


/* 
async function getCommands() : Promise<any>{
    
    let commands = await yargs(hideBin(process.argv))
    .command('curl <url>', 'fetch the contents of the URL', () => {}, (argv) => {
        console.info(argv)
    })
    .demandCommand(1)
    .parse()

    return commands
}

async function checkValidity(){
    
    const commands = await getCommands()

    console.log(commands._)
}


checkValidity()
*/