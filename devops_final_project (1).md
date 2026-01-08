# Project

## Deadline

See moodle for specific deadline.

## Opportunities

1. The DevOps project is based on all of the labs passed during the course, it is allowed to use them.

2. Work on the project can be done individually or groups, but groups are preferred. Group size should not exceed four members.  

## Instructions

### 1. Create a web application

Create a web application on any programming language (NodeJS, Java, Ruby, Python, etc...), storing data in a database (Redis, PostgreSQL, MySQL, ...) and cover it with tests of different levels.

**Proposed:**

- a little user API application with [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) user functionality
- storage in database
- tests: unit, API, configuration, connection.
- health check endpoint ensuring an application is functional

**Note!** You are allowed to use the draft application located in the [courses/devops/modules/03.continuous-testing/lab](courses/devops/modules/03.continuous-testing/lab) folder, but you have to enrich it by at least completing all comment sections marked "TODO" and must add at least one new test function combo.

### 2. Apply CI portion of the CI/CD pipeline

Configure and apply CI portion of the CI/CD pipeline using any platforms (GitHub Actions, GitLab CI/CD, Jenkins, etc...). **NOTE: DO NOT DEPLOY ON AWS, AZURE, GCP, ETC, UNLESS YOU HAVE ALREADY COMPLETED ALL RELEVANT DSTI COURSEWORK !!! THE CREDITS AVAILABLE FOR THOSE PROVIDERS ARE MEANT TO BE USED FOR OTHER DSTI COURSES. DEPLOYMENT TO A PUBLICLY ACCESSIBLE URL IS NOT A REQUIREMENT FOR THIS PROJECT. **

**Note:** While the app is not expected to be deployed publicly, it is expected to function properly when deployed in virtual machines/containers. (See steps below)

### 3. Configure and provision a virtual environment and run your application using the IaC approach

1. Configure with Vagrant: 1 VM running on any Linux distribution
2. Provision the VM with Ansible, which includes installing and running:

- language runtime
- database
- your application (use [sync folders](https://www.vagrantup.com/docs/synced-folders))
- health check of your application

### 4. Build Docker image of your application

1. Create a Docker image of your application
2. Push the image to Docker Hub. **REMEMBER** to clearly share the link to the image in the documentation!

**Note!** You must [ignore](https://docs.docker.com/engine/reference/builder/#dockerignore-file) all the files and folders that do not need to be included in the image.

### 5. Make container orchestration using Kubernetes

1. Install Kubernetes cluster using Minikube
2. Create Kubernetes Manifest YAML files:

- deployments
- services
- persistent volume and persistent volume claim

### 6. Document your project

Write a sort of report in the `README.md` file which includes the following:

1. List all the work performed (briefly, describing features and bonus tasks).

2. Screenshots (pictures of your screen when you are running a web page, K8s resources, VMs, etc... Provide maximum screenshots)

> Tip. Keep screenshots in a separate folder. Ex.: see how pictures are linked in the `index.md` files of the modules.

3. Provide instructions (commands) of how to:

- Install (or prepare environment)
- Use (your application, run your Docker container or Docker Compose cluster, on K8s cluster, ...)
- Test (your application)

4. All the necessary links with the platforms and tools integrated:

- Docker Hub
- ...

5. Author

6. Other additional info that you want to include...

> **Note!** Use the correct Markdown syntax to keep your `README.md` file looking good.

> **Note!** As per DSTI policy, usage of AI, if any, should be added to the project.   

## Structure

Here is an example structure of your project repository:

```
.github/
userapi/
  src/
  test/
  conf/
  CHANGELOG.md
  package.json
  Dockerfile
  ...
iac/
  Vagrantfile
  playbooks/
k8s/
istio/
image/
README.md
docker-compose.yaml
...
```

## How to get bonuses?

Every initiative will be counted, just don't forget to describe it in your `README.md`.

List of bonus tasks proposed:

1. Use different tools and platforms instead of what has been passed in the labs, for example, GitLab CI/CD, Netlify, etc. This will give you a bigger overview of technologies.
2. Use different languages (Java, Ruby, Python, etc.) to develop the application of part 1.
3. If you use the NodeJS application provided in the [modules/04.ct-ci-cd/assets/userapi](modules/04.ct-ci-cd/assets/userapi) folder, bring it with additional features:

- more/different API methods
- more/different unit/functional/integration tests
- using another database (like Redis, Valkey, MySQL, ...)
- integrate a documenting package to your source code, for example, [Swagger UI](https://www.npmjs.com/package/express-swagger-generator)

4. Any Kubernetes tasks from [this list](https://kubernetes.io/docs/tasks/).
5. [Securing microservice communication](https://istio.io/latest/docs/tasks/security/) or any other task with Istio.
6. Create `docker-compose.yml` file that will start your application
7. Make a service mesh using Istio

- Deploy your application using Istio
- Create configuration that routes requests between 2 different versions of your app
- Create a configuration that uses traffic shifting between 2 different versions of your app

8. Implement Monitoring to your containerized application

- Note. You can imagine something different and set up monitoring (eg. memory usage, CPU time, ...)

9. Etc.

**NOTE:** Students may complete as many bonus steps as they wish. In the event that bonus points raise the project score above 20, up to five points can be applied to the QCM score.  

## How to send a project for evaluation?

1. **ATTENTION!** Make sure **you have loaded a link to your project in Moodle!** The project will not be graded if there is not a valid Moodle link!
2. **ATTENTION!** Make sure **you have sent an invitation** to teacher's GitHub account https://github.com/jsanc525 , https://github.com/morihuang
3. After you have sent the invitation, send an email to [joe@adaltas.com](mailto:joe@adaltas.com) and [mori@adaltas.com](mailto:mori@adaltas.com) containing the following:

- **Subject format:** "DSTI - DevOps project - \<LastName FirstName\> - \<Group number (ex: SI03)\>"
- **Message:**
  - **The link to the repository** on GitHub/GitLab
  - List of authors and **the group number**

## Grading system

| Subject                                                            | Code | Max. grade |
| :----------------------------------------------------------------- | :--: | :--------: |
| Enriched web application with automated tests(with focus on tests) | APP  |     +2     |
| Continuous Integration and Continuous Delivery (and Deployment)    | CICD |     +3     |
| Containerization with Docker                                       |  D   |     +3     |
| Orchestration with Kubernetes                                      | KUB  |     +3     |
| Infrastructure as code using Ansible                               | IAC  |     +3     |
| Accurate project documentation in README.md file                   | DOC  |     +3     |
| Each bonus task                                                    | BNS  |     +1     |
| Each penalty                                                       | PNL  |     -1     |

It is also taken into account (+3):

- richness of the commit history (including the use of conventional commits!)
- accuracy and cleanliness of the project (descriptions, source code, files structure)
- activity during course sessions
