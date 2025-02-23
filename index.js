const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    const myToken = core.getInput("token");
    const owner = core.getInput("owner");
    const repos = core.getInput("repo").split(",");

    const octokit = github.getOctokit(myToken);

    let _titles = "";
    let last_dbg = [];
    for (let repo___ of repos) {
        let repo = repo___.trim();
        if (!repo) {
            continue;
        }
        if (repo === "") {
            continue;
        }
        const { data: pullRequests } = await octokit.request('GET /repos/{owner}/{repo}/pulls?state=open', {
            owner,
            repo,
        });

        last_dbg = `${pullRequests} ~ ${pullRequests.length}`
        for (let el of pullRequests) {
            const pullRequestInfo = `- https://github.com/${owner}/${repo}/pull/${el.number} ~ ${el.title}`;
            _titles += pullRequestInfo + "\n";
        }
    }
    core.setOutput("dbg", last_dbg);
    core.setOutput("titles", _titles);
}

run();
