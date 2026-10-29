// function title() {
//   let h1 = document.createElement("h1");
//   h1.classList.add("title");
//   h1.textContent = "Ajwain";
//   h1.classList.add("climate-crisis");
//   document.body.prepend(h1);


//   let h4 = document.createElement("h4");
//   h4.classList.add("subtitle");
//   h4.textContent = "Application for Job Workflows, Assignments, Issues & Networks";
//   document.body.appendChild(h4);
// }

// title();

// function cards(){
//   let cardList = document.createElement("div");
//   cardList.classList.add("cardlist");

//   let h3= document.createElement("h3");


//   document.body.appendChild(cardList)
// }
// cards()


// terminal based project

function Issue(id, title, description, priority) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.priority = priority;
  this.status = "open";
}

let issue1 = new Issue("AJ-101", "log-in failed", "button not responding", "high");
let issue2 = new Issue("AJ-102", "element not visible", "card is gone", "medium");
let issue3 = new Issue("AJ-103", "element not visible", "card is gone", "medium");

Issue.prototype.displayDetails = function () {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    priority: this.priority,
    status: this.status
  }
}

let validStatusTags = ["open", "in-progress", "done", "close"];

Issue.prototype.updateStatus = function (newStatus) {
  if (validStatusTags.includes(newStatus)) {
    this.status = newStatus;
    return newStatus;
  }
  else {
    console.error("Invalid Status Tag");
    return false;
  }
}

let priorityTags = ["low", "medium", "high", "critical"];

Issue.prototype.updatePriority = function (newPriority) {
  if (priorityTags.includes(newPriority)) {
    this.priority = newPriority;
    return newPriority;
  }
  else {
    console.error("invalid Priority Tag");
    return false;
  }
}

function IssueManager() {
  this.issues = [];
}

IssueManager.prototype.listIssues = function () {
  return this.issues;
}

IssueManager.prototype.addIssue = function (issue) {
  const duplicateId = this.issues.some(function (existingIssueId) {
    return existingIssueId.id === issue.id;
  });

  if (duplicateId) {
    console.warn("Issue with same ID already exists");
    return;
  }
  this.issues.push(issue);
};

IssueManager.prototype.findIssueById = function (id) {
  return this.issues.find(function (existingIssue) {
    return existingIssue.id === id;
  });
}

IssueManager.prototype.updateIssueStatus = function (id, newUpdatedStatus) {
  const issue = this.findIssueById(id);
  if (!issue) {
    console.warn("Issue doesn't exists");
    return false;
  }
  return issue.updateStatus(newUpdatedStatus);
}

IssueManager.prototype.deleteIssue = function (id) {
  const issue = this.issues.findIndex(function (issue) {
    return issue.id === id;
  });
  if (issue === -1) {
    console.warn("Issue not found");
    return false;
  }
  this.issues.splice(issue, 1);
  console.log("Issue removed", id);
  return true;


}

IssueManager.prototype.getIssuesByStatus = function (status) {
  const filteredIssue = this.issues.filter(function (issueStatus) {
    return issueStatus.status === status;
  });
  if (!filteredIssue) {
    console.error("Issue not found");
    return [];
  }
  return filteredIssue;
};

IssueManager.prototype.searchIssues = function (query) {
  if (query.trim() === "") {
    console.warn("Empty query field");
    return [];
  };
  return this.issues.filter(function (issueQuery) {
    return issueQuery.title.toLowerCase().includes(query.toLowerCase()) || issueQuery.description.toLowerCase().includes(query.toLowerCase());
  });
};
IssueManager.prototype.editIssue = function (id, newTitle, newDescription) {
  let issue = this.findIssueById(id);
  if (!issue) {
    console.warn("Issue doesn't exists");
    return false;
  }
  issue.title= newTitle;
  issue.description=newDescription;
  console.log("Success");
  return true;
}

IssueManager.prototype.updateIssuePriority= function(id, newPriority){
  let issue = this.findIssueById(id);
  if (!issue) {
    console.warn("Issue doesn't exists");
    return false;
  }
  let oldPriority=issue.priority;
  let result= issue.updatePriority(newPriority);

  if(result === false){
    return false
  }
  console.log(`Issue with ${id} successfully changed from ${oldPriority} to ${newPriority}`);
  return true;
}

let manager = new IssueManager();

console.log(issue1.displayDetails());
console.log(issue2.displayDetails())

console.log(issue1.updateStatus("in-progress")); // "in-progress"
console.log(issue1.updateStatus("banana"));      // false
console.log(issue1.status);
console.log(issue2.status);

console.log(issue1.updatePriority("low"));
console.log(issue1.updatePriority("banana"));
console.log(issue1.priority);

console.log(manager.listIssues());
console.log(manager.issues)

manager.addIssue(issue1);
manager.addIssue(issue2);
manager.addIssue(issue3);

console.log(manager.listIssues());

console.log(manager.findIssueById("AJ-101")); // Matching Issue object
console.log(manager.findIssueById("AJ-102")); // undefined, if not found

console.log(manager.updateIssueStatus("AJ-101", "done"));
console.log(manager.findIssueById("AJ-101").status);
console.log(manager.listIssues());

// console.log(manager.deleteIssue("AJ-102"));

console.log(manager.getIssuesByStatus("open"));
console.log(manager.listIssues());

console.log(manager.searchIssues("CARD"));
console.log(manager.searchIssues("log-in"));
console.log(manager.searchIssues("not responding"));
console.log(manager.searchIssues(" "));

console.log(manager.findIssueById("AJ-101"));
manager.editIssue(
  "AJ-101",
  "Login button broken",
  "Login button does not respond"
);

console.log(manager.findIssueById("AJ-101"));
console.log(manager.updateIssuePriority("AJ-101", "critical"));
console.log(manager.findIssueById("AJ-101"))
console.log(manager.updateIssuePriority("AJ-101", "banana"));
console.log(manager.updateIssuePriority("AJ-111", "banana"))



// console.log(issue1.displayDetails===issue2.displayDetails);
