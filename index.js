const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    const myToken = core.getInput("token");
    const owner = core.getInput("owner");
    const repos = core.getInput("repo").split(",");

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

        core.setOutput("dbg", `${pullRequests} ~ ${pullRequests.length}`);

        for (let el of pullRequests) {
            const pullRequestInfo = `${_repo} [${el.number}] ${el.title}`;
            _titles.push(pullRequestInfo);
        }
    }
    core.setOutput("titles", _titles);
}

run();
