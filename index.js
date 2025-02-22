const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    const myToken = core.getInput("token");
    const owner = core.getInput("owner");
    const repos = JSON.parse(core.getInput("repos"));

    const octokit = github.getOctokit(myToken);

    let _titles = [];
    let _ids = [];
    let _repo = [];
    for (let repo of repos) {
        const { data: pullRequests } = await octokit.request('GET /repos/{owner}/{repo}/pulls?state=open', {
            owner,
            repo,
        });
        for (let el of pullRequests) {
            _ids.push(el.number);
            _titles.push(el.title);
            _repo.push(repo);
        }
    }
    core.setOutput("repo", _repo);
    core.setOutput("ids", _ids);
    core.setOutput("titles", _titles);
}

run();
