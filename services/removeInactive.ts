import axios from "axios";

interface Deployment {
    id: string;
    state: string;
}

const removeInactiveDeployments = async (
    token: string,
    repoName: string,
    username: string
) => {
    const URL = `https://api.github.com/repos/${username}/${repoName}/deployments`;
    const config = {
        headers: {
            authorization: `token ${token}`,
        },
    };

    try {
        const deployments = await axios.get<Deployment[]>(URL, config);
        console.log(`${deployments.data.length} deployments found`);

        const inactiveDeployments = await Promise.all(
            deployments.data.map(async (deployment) => {
                const statuses = await axios.get<{ state: string }[]>(
                    `${URL}/${deployment.id}/statuses`,
                    config
                );
                if (statuses.data[0].state === "inactive") {
                    return deployment;
                }
            })
        );

        const deletedDeployments = await Promise.all(
            inactiveDeployments.map(async (deployment) => {
                if (!deployment) {
                    return;
                }
                const response = await axios.delete(
                    `${URL}/${deployment.id}`,
                    config
                );
                return response.data;
            })
        );

        console.log(`${deletedDeployments.length} deployments deleted`);
    } catch (error) {
        console.error(error);
    }
};

export default removeInactiveDeployments;
