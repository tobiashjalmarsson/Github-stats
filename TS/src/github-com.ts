// file to handle the communication and presentation of github data

import {Octokit} from 'octokit'
// npx ts-node main.ts
import {StatsType} from './CommonInterfaces'


console.log("Test")
const OWNER : string = "DSLsofMath"
const REPO : string = "DSLsofMath"
const resp = `https://api.github.com/repos/${OWNER}/${REPO}/stats/code_frequency`

const dummyWeeks = [0, 1, 2, 3, 4, 5]
const dummyCommits = [2, 1, 4, 5, 0, 1]

const octokit = new Octokit({
    auth: 'personal-access-token123'
  })

console.log(resp)



class GitHubData{
    owner: string;
    repo: string;
    statsType : StatsType;
    commits: Array<number>;
    weekIndex : Array<number>;
    
    constructor(owner:string, repo:string, statsType?:StatsType){
        this.owner = owner;
        this.repo = repo;
        this.statsType = (statsType !== undefined) ? statsType : StatsType.CommitActivity
        //this.fetchRepoActiviy()
        this.commits = []
        this.weekIndex = []
    }

    async fetchRepoActiviy() {
        const octokit = new Octokit({
            //auth: 'personal-access-token123'
        })

        if (this.statsType == StatsType.CommitActivity){
            const {data: root} = await octokit.request('GET /repos/{owner}/{repo}/stats/code_frequency', {
                owner: this.owner,
                repo: this.repo
            })

            if (root instanceof Array<any>){
                root.map((val, idx) => {
                    this.commits.push(val[1])
                    this.weekIndex.push(idx)
                })
            }
            
            
        }
    }

    displayData(){
        if(this.statsType == StatsType.CommitActivity){
            console.log("\x1b[4m", "Weeks(idx):    Commits(#):", '\x1b[0m')
            let bars : Array<string> = []
            dummyCommits.map(d => {
                let commitStr : string = ""
                for (let i = 0; i < d; i++){
                    commitStr = commitStr + "-"
                }
                bars.push(commitStr)
            })
            bars.map((bar, idx) => {
                let toPrint = `Week(${idx})        Commits(${bar.length})|${bar}>`
                if (idx % 2 !== 1) {
                    console.log("\x1b[32m", toPrint, "\x1b[32m")
                } else {
                    console.log('\x1b[36m',  toPrint,'\x1b[0m');
                }
            })

        }


    }

    
}

const ghd = new GitHubData(OWNER, REPO, StatsType.CommitActivity)
ghd.displayData()
