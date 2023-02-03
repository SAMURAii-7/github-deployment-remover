import axios from "axios";

interface Deployment {
    id: string;
    state: string;
}

const removeInactiveDeployments = async (
    token: string,
    username: string,
    repoName: string
) => {
    const URL = `https://api.github.com/repos/${username}/${repoName}/deployments`;
    const config = {
        headers: {
            Authorization: `Token ${token}`,
        },
    };

    try {
        const deployments = await axios.get<Deployment[]>(URL, config);
        console.log(`${deployments.data.length} deployments found`);

        const inactiveDeployments = deployments.data.filter(
            (deployment) => deployment.state === "inactive"
        );
        console.log(`${inactiveDeployments.length} inactive deployments found`);

        const deletedDeployments = await Promise.all(
            inactiveDeployments.map(async (deployment) => {
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
