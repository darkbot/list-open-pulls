const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    const myToken = core.getInput("token");
    const owner = core.getInput("owner");
    const repos = core.getInput("repos").split(",");

    const octokit = github.getOctokit(myToken);

    let _titles = [];
    
    for (let repo of repos) {
        let _repo = repo.trim();
        if (!_repo) {
            continue;
        }
        if (_repo === "") {
            continue;
        }
        const { data: pullRequests } = await octokit.request('GET /repos/{owner}/{_repo}/pulls?state=open', {
            owner,
            repo: _repo,
        });
        for (let el of pullRequests) {
            _titles.push(_repo +" ["+el.number+"] " + el.title);
        }
    }
    core.setOutput("titles", _titles);
}

run();
