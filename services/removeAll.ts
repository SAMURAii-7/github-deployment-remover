import axios from "axios";

interface Deployment {
    id: string;
}

const removeDeployments = async (
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
                const response = await axios.post(
                    `${URL}/${deployment.id}/statuses`,
                    { state: "inactive" },
                    config
                );
                return response.data.id;
            })
        );

        console.log(
            `${inactiveDeployments.length} deployments marked as "inactive"`
        );

        const deletedDeployments = await Promise.all(
            inactiveDeployments.map(async (id) => {
                const response = await axios.delete(`${URL}/${id}`, config);
                return response.data;
            })
        );

        console.log(`${deletedDeployments.length} deployments deleted`);
    } catch (error) {
        console.error(error);
    }
};

export default removeDeployments;
