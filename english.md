# 60 Decibel 

### Open-source Mobile Questionnaire Service for Deaf Patients

##### 																															Deployment Date : 2019.10.06 / Version 1.0.7

![img](http://www.60decibel.cf/img/logo.6f8f8ca2.png)

### Document Outline

---

#####  1. Development Guideline

#####  2. Motive for Development

#####  3. Development Team

#####  4. Value as Open-Source

#####  5. Design Patterns

##### 6. Architecture

#####  7. Implication

#####  8. Conclusion



### 1. Guideline

---

##### 1.1) Prior to the Beginning

- Stacks

  - 60 Decibel team chooses Vue.js at the frontend and DRF(Django Rest Framework) at the backend.

    |                      Frontend - Vue.js                       |                        Backend - DRF                         |
    | :----------------------------------------------------------: | :----------------------------------------------------------: |
    | ![vue.js에 대한 이미지 검색결과](https://www.fullstackpython.com/img/logos/vuejs-wide.png) | ![drf에 대한 이미지 검색결과](https://t1.daumcdn.net/cfile/tistory/9994C4475B17C3F224) |

  - Modules used in frontend framework

    |                         Vuetify                         |                            Axios                             |                             Vuex                             |
    | :-----------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
    | ![관련 이미지](https://kr.vuejs.org/images/vuetify.png) | ![axios에 대한 이미지 검색결과](https://assets.axios.com/8c7766945e1b76f1285485dba86f3d3a.png) | ![vuex에 대한 이미지 검색결과](https://blog.martinwork.co.kr/images/vue/vuex.png) |

  - Modules used in backend framework

    - `JWT(Json Web Token) for Authentication`
    - `Django Cors Headers`

```
> git clone https://github.com/RyanKor/60DB.git

# main/frontend/package.json (Move to the location Vue.js modules are)
> npm install (Install Vue.js modules) 

# 60db
> python -m venv 60db (Virtual Environment Installation. You can select any virtual environment setting like pipenv or virtualenv.)
> source 60db/Script/activate
> (60db) pip install -r requirements.txt (Install backend modules)
> cd main (Move to the folder manage.py is)
> Make migrations folders in profiles, survey, users app each.
> Create __init__.py in each migrations folders.
> (Move to where manage.py is) python manage.py makemigrations
> python manage.py migrate
> python manage.py createsuperuser
> (After making admin accounts) python manage.py runserver.
```

- Install all of the modules listed in Package.json and requirements.txt for an environment setting.



##### 1.2) Terminological Matters

- `Medical jargons` have been used for accurate diagnosis of doctors. When you are writing codes, we appreciate you send pull requests on questionnaire and writing a profile if you would keep in mind the medical terminology.
  - ex) Models.py in survey application : abdominal inflation, lump on abdomen etc.
- Please be aware of the modification of some terms such as 'palpate' when modifying the functions of medical examination cards. 



##### 1.3) Components Configuration Issues

- 60 decibel's initial team members are `non-CS major students` with less than six months of development experience.  Therefore, please understand that the basic knowledge of the component hierarchy and reusable component configurations is short.

- Component Configurations

  ![img](https://miro.medium.com/max/778/1*SdUU_2mRkudGsk6OkQU1pw.png)

  

- My team divided components by pages and functions. 

  - `aboutPage` : This component guides you through the purpose and introduction of the service.
  - `cardPage` : This component contains medical examination card function to facilitate communication with deaf patients.
  - `homePage` : This component manages the main page that appears when clients is accessed. 
  - `profilePage` : It is a component that displays the profiles of deaf patients. 
  - `profileUploadPage` : It is a component that updates the profile of the patients.
  - `registerPage` : This Component manages user information such as Login and Signup functions.
  - `resultsPage` :  It is a component that display results after creating mobile questionnaires.
  - `surveyPage` : It is a component that manages pages related to the creation of mobile questionnaires.



### 2. Motive for Development

---

> *Both developers and non-developers are already indebted to open-source. In everyday life, home appliances applied with the Internet of Things, frameworks and libraries that directly affect software development are placed in indispensable positions. The biggest reason why open-source is welcomed is that open-source can be validated by the developer community and can distribute stable code to service operations. Therefore, the bigger the impact software has on human life, the bigger the open-source ecosystem will play.*



- The average length of treatment time for Korean patients visiting hospitals is **three minutes**.
- Patients and doctors are used to receving hospital treatment in this short period of time, but in fact, **the OECD average treatment time is fifteen minutes**. 
- Although it is true that it is difficult to accurately treat patients and doctors within three minutes, **it is easy to see a list of five to six patients at a 15-minute interval at a university hospital**. 
- Under these physical constraints, it is impossible for a doctor to examine patients carefully or answer their questions easily. 
- In the current medical system, it is difficult for even ordinary patients to receive meticulous care, disabled patients face even more difficult situations. 
- In particular, deaf patients have difficulty to answer basic medical questions such as where they are sick and what they are asking if there is no one to help them communicate with. 
- In the end, when they feel sick, visiting hospital itself becomes more uncomfortable and they hesitate to visit it. 
- My team made the mobile questionnaire software for hearing impaired people in the hope that those who are unable to recognize the doctor's voice will be able to communicate effectively within a short period of time. 
- We hope that they can find hospitals and enjoy their rights.



### 3. Development Team

---



##### 3.1) Cooperation Teams

|                          60 Decibel                          |                         Likelion 7th                         |             Korea University College of Medicine             |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://miro.medium.com/max/6500/0*8ZoDIczhINwo3S_C.png" alt="img" width="10%" height="10%" /> | <img src="https://miro.medium.com/max/1505/0*hGXvYP1axwfYC2Uz.png" alt="img" style="zoom:200%;" /> | <img src="https://miro.medium.com/max/2250/0*NWcf3ziwIZRCCShH.png" alt="img" style="zoom:200%;" /> |

- **60DB** : We are all likelion 7th members from KU and non-CS major junior developers. My team is in charge of developing 60decibel. 
- **Likelion** : Computer programming clubs that help non-CS students learn basic programming knowledge and create their own Web services. My team have been consulted on the general matters concerning development.
- **KU College of Medicine** : The medical school team is charging of planning for the development and conducted beta tests for deaf patients.

##### 3.2) 60 Decibel Development TEAM

|                         TEAM Members                         |                            Roles                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![img](https://miro.medium.com/max/355/1*CGVdsQGdvMs0pDrwHriJUg.png) | **Kim Seung Tae**<br />Korea University Department of English Language and Literature<br />- Vue.js / Django Rest Framework<br />- Markdown Opensource Documentation, Deployment(AWS) |
| ![img](https://miro.medium.com/max/355/1*6TZJWeNd-rqke74FRXUFbQ.png) | **Lee In Woo**<br />Korea University  Department of Chinese Language and Literature<br /> - Vue.js / Django Rest Framework<br /> - Debugging Test & Refactoring, Deployment(AWS) |
| ![img](https://miro.medium.com/max/355/1*VjEk7aBft9CFh_vkLEgkWw.png) | **Park Ji Hwan** <br />Korea University Department of Psychology<br />- Vue.js / Django Rest Framework <br />- Frontend Refactoring Generalization<br /> |
| ![img](https://miro.medium.com/max/363/1*jEoNQiaQXaL29g67k8EUtw.png) | **Choi Sang Ha**<br />Korea University Department of Psychology<br />- Vue.js / CSS<br />- UX/UI Generalizaion |
| ![img](https://miro.medium.com/max/355/1*G6wWgxKWRbIJJYdfNWag_w.png) | **Park Sun Young**<br />Korea University School of Health and Environmental Science<br />- Vue.js / Django Rest Framework<br />- Making Backend Serializer & Frontend About Us Page |
| ![img](https://miro.medium.com/max/355/1*QrBPyzQjHzXDBFSZt4UK8Q.png) | **Lee Chae Yeon** <br />Korea University Department of German Language and Literature<br />- Vue.js<br />-  Making Smart Mobile Medical Examination Cards |



### 4. Value as Open-Source

---



- It was built from the beginning in the form of a web-app to be used in tablet PCs and mobiles, which are operated by health centers and hospitals that focus on the treatment of deaf patients across the country.
- This can improve communication difficulties that inevitably occur during examinations between the deaf patients – the physician has the advantage of providing more accurate care in the course of the examination, provided that the patients prepares a questionnaire prior to the examination.
- Our team is aimed at going through beta testing in November and distributing it in the form of apps. The reason why the app is launched is because it allows deaf patients to show their doctors right away with their smartphones, which they have prepared in advance and brought before visiting the hospital.
- A higher level of service could be provided if multiple developers participated in the 60 decibel project in the form of open-source.





### 5. Design Patterns

----



 **5.1) Vuex Based on Flux**

![img](https://miro.medium.com/max/3200/1*5zOwxATnE8alOXUKnB3HOg.png)

- Vuex based on the Flux Design Pattern was adopted for the purpose of managing user status changes that are accessed by multiple users.

- Vuex induces changes in the Mutations through the Commit of Actions with status data written in the State.

- Finally, changed State data is rendered to View Components.

   

 **5.2) System Configuration**

![img](https://miro.medium.com/max/3200/1*jw3YdTOarDsLg-iWs1sJ5w.png)

- `The client`'s main access path will be Web browsers and mobile applications..

- `Middleware` reflected the settings.py in Django.

- `The server` used the DRF and the deployment took place in the AWS EC2 - Ubuntu environment.

- `Data` specified key stored data such as Login / Profile / Survey as Default DB, Sqlite.

  

### 6. Architecture

---

- `Flexibility`: State values that should be shared across components - user authentication - can be applied non-independent to the component.. 

- `Scalability`: Unlike Model–View-Controller (MVC) models, state values can be handled for a large number of users.

- `Maintainability`: Taking advantage of the characteristics of Vue.js, my team wrote intuitive, readable codes. These codes can help developers participating in the open-source community when they try to manage and maintain the software.

- `Reusability`: Components, Actions, Mutations, and State were separated and configured for reuse in each unit.



### 7. Implications

---



- It successfully carried out its mission as the first development project of the 60 Decibel team.
- During the patients - doctor's conversation, communication about abdominal pain could be improved up to 80%.
- My team was able to correct errors in the testing process and think about writing a stable code.
- By writing components by function, it was possible to write codes that were easy to maintain and reuse components.



### 8. Conclusion

---



- The greatest advantage of open-source development is that it is meaningful to write verifiable and stable codes by a number of developers. 
- We would like to thank the mentors of **the OSS(Open-Source Software) Center** and **my seniors** who graduated from Korea University, engaging in development, for their help in the production process, my team will continue to add more questionnaires other than stomachaches through future updates.