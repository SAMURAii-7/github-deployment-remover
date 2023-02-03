import React, { useState } from "react";
import removeDeployments from "@/services/removeAll";
import removeInactiveDeployments from "@/services/removeInactive";

type Props = {};

function UserInput({}: Props) {
    const [token, setToken] = useState<string>("");
    const [repo, setRepo] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [removeAll, setRemoveAll] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (removeAll) removeDeployments(token, repo, user);
        else removeInactiveDeployments(token, repo, user);
        alert("Deployments removed successfully!");

        setToken("");
        setRepo("");
        setUser("");
        setRemoveAll(false);
    };

    return (
        <form
            className=" bg-[#161b22] flex flex-col mt-[50px] items-center justify-center border border-[#c9d1d9] rounded-md w-[600px] h-[500px] p-10 max-md:w-[320px] "
            onSubmit={handleSubmit}
        >
            <label className="pt-4 pb-2" htmlFor="token">
                Github Token
            </label>
            <input
                className=" bg-[#010409] w-[300px] p-[8px] border border-[#30363d] rounded-[5px] outline-none max-md:w-[280px] "
                type="text"
                id="token"
                value={token}
                placeholder="Need `repo_deployments` permission"
                onChange={(e) => setToken(e.target.value)}
            />
            <label className="pt-4 pb-2" htmlFor="repo">
                Repository Name
            </label>
            <input
                className=" bg-[#010409] w-[300px] p-[8px] border border-[#30363d] rounded-[5px] outline-none max-md:w-[280px] "
                type="text"
                id="repo"
                value={repo}
                placeholder="my-repo"
                onChange={(e) => setRepo(e.target.value)}
            />
            <label className="pt-4 pb-2" htmlFor="user">
                Github Username/Org Name
            </label>
            <input
                className=" bg-[#010409] w-[300px] p-[8px] border border-[#30363d] rounded-[5px] outline-none max-md:w-[280px] "
                type="text"
                id="user"
                value={user}
                placeholder="john-doe"
                onChange={(e) => setUser(e.target.value)}
            />
            <div className="pt-4 pb-2">
                <input
                    type="checkbox"
                    id="removeAll"
                    checked={removeAll}
                    onChange={() => setRemoveAll(!removeAll)}
                />
                <label className="pt-4 pb-2 ml-2" htmlFor="removeAll">
                    Remove All Deployments
                </label>
            </div>
            <button
                className=" mt-10 px-10 py-[5px] bg-[#30363d] text-[#c9d1d9] border border-[#c9d1d9] rounded-[5px] hover:border-[#8b949e] "
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}

export default UserInput;
