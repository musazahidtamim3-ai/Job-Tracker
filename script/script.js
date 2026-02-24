let interviewList = [];
let rejectedList = [];
let currentStatus = "add-jobs"

let total = document.getElementById("total");
let intCount = document.getElementById("int-count");
let rejCount = document.getElementById("rej-count");
let availableCount = document.getElementById("available-count");

let cardContainer = document.getElementById("card-container");
let filteredSection = document.getElementById("filtered-section");
let mainContainer = document.querySelector("main")

function calculateCount() {
    total.innerText = cardContainer.children.length;
    intCount.innerText = interviewList.length;
    rejCount.innerText = rejectedList.length;
    if (availableCount) {
        availableCount.innerText = `${cardContainer.children.length} jobs`;
    }
}

calculateCount();

const addJobs = document.getElementById("add-jobs");
const intFilter = document.getElementById("inter-filter");
const rejFilter = document.getElementById("rej-filter");

function btnToggle(id) {
    addJobs.classList.add("btn")
    intFilter.classList.add("btn")
    rejFilter.classList.add("btn");

    addJobs.classList.remove("bg-blue-400", "text-white", "hover:bg-blue-500")
    intFilter.classList.remove("bg-blue-400", "text-white", "hover:bg-blue-500")
    rejFilter.classList.remove("bg-blue-400", "text-white", "hover:bg-blue-500");

    const selected = document.getElementById(id);
    currentStatus = id;
    selected.classList.remove("btn")
    selected.classList.add("btn", "bg-blue-400", "text-white", "hover:bg-blue-500")

    if (id == "inter-filter") {
        cardContainer.classList.add("hidden");
        filteredSection.classList.remove("hidden")
        renderInterview();

    }

    else if (id == "add-jobs") {
        cardContainer.classList.remove("hidden");
        filteredSection.classList.add("hidden");
    }
    else if (id == "rej-filter") {
        cardContainer.classList.add("hidden");
        filteredSection.classList.remove("hidden");
        renderRejected();

    }
}

mainContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("int-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const jobName = parentNode.querySelector(".job-name").innerText;
        const jobPost = parentNode.querySelector(".post").innerText;
        const deleteBtn = parentNode.querySelector(".delete-btn");
        const jobType = parentNode.querySelector(".job-type").innerText;
        const status = parentNode.querySelector(".sta").innerText;
        const description = parentNode.querySelector(".describe").innerText;

        const cardInfo = {
            jobName,
            jobPost,
            deleteBtn,
            jobType,
            status: "Interview",
            description
        }

        const jobExist = interviewList.find(item => item.jobName == cardInfo.jobName);
        parentNode.querySelector('.sta').innerText = "Interview"
        parentNode.querySelector('.sta').classList.remove("btn", "btn-soft", "btn-primary");
        parentNode.querySelector('.sta').classList.add("btn", "btn-outline", "btn-success");
        if (!jobExist) {
            interviewList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.jobName != cardInfo.jobName)
        if (currentStatus == "inter-filter") {
            renderInterview();
        }
        else if (currentStatus == "rej-filter") {
            renderRejected();
        }
        calculateCount()

    }
    else if (event.target.classList.contains("reject-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const jobName = parentNode.querySelector(".job-name").innerText;
        const jobPost = parentNode.querySelector(".post").innerText;
        const deleteBtn = parentNode.querySelector(".delete-btn");
        const jobType = parentNode.querySelector(".job-type").innerText;
        const status = parentNode.querySelector(".sta").innerText;
        const description = parentNode.querySelector(".describe").innerText;

        const cardInfo = {
            jobName,
            jobPost,
            deleteBtn,
            jobType,
            status: "Rejected",
            description
        }

        const jobExist = rejectedList.find(item => item.jobName == cardInfo.jobName);
        parentNode.querySelector('.sta').innerText = "Rejected"
        parentNode.querySelector('.sta').classList.remove("btn", "btn-soft", "btn-primary");
        parentNode.querySelector('.sta').classList.add("btn", "btn-outline", "btn-error");
        if (!jobExist) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.jobName != cardInfo.jobName);
        if (currentStatus == "inter-filter") {
            renderInterview();
        }
        else if (currentStatus == "rej-filter") {
            renderRejected();
        }

        calculateCount()

    }

    else if (event.target.closest(".delete-btn")) {
        const parentNode = event.target.closest(".bg-base-100");

        const jobName = parentNode.querySelector(".job-name").innerText;

        const allCards = Array.from(cardContainer.children);
        const cardToDelete = allCards.find(card => card.querySelector(".job-name").innerText === jobName);
        if (cardToDelete) {
            cardToDelete.remove();
        }

        parentNode.remove();

        interviewList = interviewList.filter(item => item.jobName != jobName);
        rejectedList = rejectedList.filter(item => item.jobName != jobName);

        calculateCount()

        if (currentStatus === "inter-filter") {
            renderInterview();
        }
        else if (currentStatus === "rej-filter") {
            renderRejected();
        }

    }

})

function renderInterview() {
    filteredSection.innerHTML = ""
    if (interviewList.length == 0) {
        filteredSection.innerHTML = `
        <div id="no-jobs" class="flex flex-col gap-3 text-center items-center bg-base-100 p-20 rounded-md">
                <img src="./images/jobs.png" alt="">
                <h3 class="font-semibold text-[25px] text-[#002C5C]">No jobs Available</h3>
                <p>Check back soon for new job opportunities</p>
            </div>
        `
        return;
    }
    for (let interview of interviewList) {
        const statusClass = "btn-outline btn-success";
        let div = document.createElement("div");
        div.className = "bg-base-100 p-7 rounded-md mt-5 ";
        div.innerHTML = `
        <div class="flex justify-between items-center">
                    <div>
                        <h1 class="job-name font-semibold text-[25px] text-[#002C5C] pb-1">${interview.jobName}</h1>
                        <p class="post text-[#323b49bb] ">${interview.jobPost}</p>
                    </div>
                    <button class="btn rounded-full delete-btn">
                        <img src="./images/Trash.png" alt="">
                    </button>
                </div>
                <p class="job-type text-[#323b49bb] pt-5 pb-5">${interview.jobType}</p>
                <button id="not-app" class="btn ${statusClass} sta">${interview.status}</button>
                <p class="describe text-[#323B49] pt-3 pb-5">${interview.description}</p>
                <div class="flex gap-3">
                    <button class="btn btn-outline btn-success int-btn">Interview</button>
                    <button class="btn btn-outline btn-error reject-btn">Rejected</button>
                </div>
        `
        filteredSection.appendChild(div)
    }
}

function renderRejected() {
    filteredSection.innerHTML = ''
    if (rejectedList.length == 0) {
        filteredSection.innerHTML = `
        <div id="no-jobs" class="flex flex-col gap-3 text-center items-center bg-base-100 p-20 rounded-md">
                <img src="./images/jobs.png" alt="">
                <h3 class="font-semibold text-[25px] text-[#002C5C]">No jobs Available</h3>
                <p>Check back soon for new job opportunities</p>
            </div>
        `
        return;
    }
    for (let reject of rejectedList) {
        const statusClass = "btn btn-outline btn-error"
        let div = document.createElement("div");
        div.className = "bg-base-100 p-7 rounded-md mt-5 ";
        div.innerHTML = `
        <div class="flex justify-between items-center">
                    <div>
                        <h1 class="job-name font-semibold text-[25px] text-[#002C5C] pb-1">${reject.jobName}</h1>
                        <p class="post text-[#323b49bb] ">${reject.jobPost}</p>
                    </div>
                    <button class="btn rounded-full delete-btn">
                        <img src="./images/Trash.png" alt="">
                    </button>
                </div>
                <p class="job-type text-[#323b49bb] pt-5 pb-5">${reject.jobType}</p>
                <button id="not-app" class="btn ${statusClass} sta">${reject.status}</button>
                <p class="describe text-[#323B49] pt-3 pb-5">${reject.description}</p>
                <div class="flex gap-3">
                    <button class="btn btn-outline btn-success int-btn">Interview</button>
                    <button class="btn btn-outline btn-error reject-btn">Rejected</button>
                </div>
        `
        filteredSection.appendChild(div)
    }
}