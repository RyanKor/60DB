# 60 Decibel

### 청각 장애인 환자들을 위한 오픈소스 모바일 문진표 서비스

![img](http://www.60decibel.cf/img/logo.6f8f8ca2.png)

### 문서 개요

---

#####  1. 개발 가이드라인

#####  2. 개발 동기

#####  3. 개발 팀 구성

#####  4. 오픈 소스로써의 가치

#####  5. Design Patterns

##### **6. 아키텍처**

#####  7. 시사점

#####  8. 맺음말



### 1. 가이드라인

---

##### 1.1) 문서를 시작하기 전에

- 스택 구성

  - Frontend는 Vue.js & Backend는 DRF(Django Rest Framework)를 사용했습니다.

    |            자바스크립트 기반 웹 프레임워크 Vue.js            |              파이썬 기반 백엔드 프레임워크 DRF               |
    | :----------------------------------------------------------: | :----------------------------------------------------------: |
    | ![vue.js에 대한 이미지 검색결과](https://www.fullstackpython.com/img/logos/vuejs-wide.png) | ![drf에 대한 이미지 검색결과](https://t1.daumcdn.net/cfile/tistory/9994C4475B17C3F224) |

  - 웹 프레임워크 사용 모듈

    |                         Vuetify                         |                 Axios(프론트 & 백엔드 통신)                  |               Vuex(로그인 & 문진표 상태 관리)                |
    | :-----------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
    | ![관련 이미지](https://kr.vuejs.org/images/vuetify.png) | ![axios에 대한 이미지 검색결과](https://assets.axios.com/8c7766945e1b76f1285485dba86f3d3a.png) | ![vuex에 대한 이미지 검색결과](https://blog.martinwork.co.kr/images/vue/vuex.png) |

  - 백엔드 프레임워크 사용 모듈

    - `Json Web Token`
    - `Django Cors Headers`

```
> git clone https://github.com/RyanKor/60DB.git

# main/frontend/package.json (Vue.js 모듈 설치 파일 위치로 이동)
> npm install (Vue.js 모듈 설치 진행) 

# 60db
> python -m venv 60db (가상환경 설치. pipenv or virtualenv 어떤 것이든 사용가능)
> source 60db/Script/activate
> (60db) pip install -r requirements.txt (백엔드 모듈 관련 부분 설치)
```

- 원활한 소프트웨어 활용을 위해 Package.json 과 requirements.txt에 명시된 모듈들을 모두 설치해주십시오.



##### 1.2) 용어에 관한 사항

- 의사들의 정확한 진단을 위해 `의학 전문 용어`가 사용되었습니다. 60 Decibel에 설문지 및 프로필 작성에 관한 PR을 보내주시는 개발자님들께선 용어 사용에 유념해 코드를 작성해주시면 감사하겠습니다.
  - 예) survey application 내의 models.py : 복부팽만, 복부종괴 등
- 문진카드 기능 수정 시, '촉진' 등 일부 용어 사용에 대해 수정 시 유념해주십시오. 



##### 1.3) 컴포넌트 구성에 관한 사항

- **60 Decibel의 초기 개발팀은 개발 경력 6개월 미만의 비전공생들로 구성**되었습니다. 따라서 컴포넌트 계층 및 Reusable한 컴포넌트 구성에 관한 기본 지식이 짧은 점 이해해주시기 바랍니다.

- 컴포넌트 구성

  ![img](https://miro.medium.com/max/778/1*SdUU_2mRkudGsk6OkQU1pw.png)

  

- 60 Decibel은 페이지와 기능에 따라 컴포넌트를 구분했다. 

  - `aboutPage` : 서비스의 목적 및 소개를 안내하는 컴포넌트다.
  - `cardPage` : 청각장애인의 의사와의 원활한 소통을 위해 포함시킨 문진 카드 기능이 담긴 컴포넌트다.
  - `homePage` : 페이지 접속 시 등장하는 메인 페이지를 관리하는 컴포넌트다. 
  - `profilePage` : 청각장애인의 프로필을 표시하는 컴포넌트다. 
  - `profileUploadPage` : 청각장애인의 프로필을 업데이트 하는 컴포넌트다.
  - `registerPage` : 로그인, 회원가입 기능 등을 관리하는 컴포넌트다.
  - `resultsPage` :  모바일 문진표를 작성하고 난 이후 결과값을 표시하는 컴포넌트다.
  - `surveyPage` : 모바일 문진표 작성과 관련한 페이지를 관리하는 컴포넌트다.



### 2. 개발동기

---

> *개발자와 비개발자 모두가 이미 오픈소스에 큰 빚을 지고 있다. 일상생활에선 사물인터넷이 적용되는 가전제품부터 소프트웨어 개발에 직접적으로 영향을 주는 프레임워크 및 라이브러리 등이 필수불가결한 위치에 자리매김하고 있다. 오픈 소스가 환영받는 가장 큰 이유를 들라고 한다면, 오픈소스가 개발자 커뮤니티에 의해 검증되고 서비스 운용에 안정적인 코드를 배포할 수 있다는 점 때문일 것이다. 때문에 소프트웨어가 인간의 삶에 미치는 영향이 커질수록 오픈 소스 생태계도 함께 더 큰 역할을 맡게 될 것이다.*



- 병원을 찾는 대한민국 환자들의 병원 **평균 진료시간은3분**이다.
- 환자도, 의사도 이 짧은 시간 안에 병원 진료를 하는 것에 익숙해져 있으나 사실 **OECD 평균 환자의 진료시간은 15분**이다. 
- **3분**이라는 시간 동안 환자와 의사사이의 진료가 정확하게 이뤄지기 어려운 것이 사실이지만, 대학병원에서도 15분 내에 5-6명의 환자가 예약되어 있는 진료 명단을 쉽게 볼 수 있다. 
- 이러한 물리적 제약 속에서 의사가 환자를 꼼꼼하게 진찰한다거나 환자의 궁금증에 대하여 알아들을 수 있게 답변한다는 것은 불가능하다. 
- 일반 환자들조차 꼼꼼한 진료를 받기 어려운 현재의 의료 체계 속에서 장애인 환자들은 더욱 어려운 상황을 마주한다. 
- 특히 청각장애인들은 옆에 의사소통을 도와줄 사람이 없다면 의사에게 자신이 어디가 아파서 왔는지, 의사가 어떤 것을 묻고 있는지 등 진료의 기본이 되는 질문을 듣고 답하는 것조차 어려운 것이 현실이다. 
- 결국에는 몸이 아픔에도, 병원을 방문하는 것 자체가 더 큰 불편함이 되어 병원을 찾는 것을 망설이기도 한다. 
- 60 decibel팀은 의사의 말을 인지하기 어려운 이들이, 짧은 문진시간 내에 효율적인 의사소통을 바탕으로 원활한 진료를 받을 수 있기를 바라는 마음에서 청각장애인을 대상으로 한 모바일 문진표 소프트웨어를 제작하였다. 
- 이를 통해 이들이 부담없이 병원을 찾고, 자신들의 기본적인 권리를 누릴 수 있기를 바란다.



### 3. 개발 팀 구성

---



##### 3.1) 협력 팀 소개

|                          60 Decibel                          |                     멋쟁이 사자처럼 7기                      |                     고려대학교 의과대학                      |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://miro.medium.com/max/6500/0*8ZoDIczhINwo3S_C.png" alt="img" style="zoom:25%;" width="100%" height="100%" /> | <img src="https://miro.medium.com/max/1505/0*hGXvYP1axwfYC2Uz.png" alt="img" style="zoom:200%;" /> | <img src="https://miro.medium.com/max/2250/0*NWcf3ziwIZRCCShH.png" alt="img" style="zoom:200%;" /> |

- **60DB** : 고려대학교 멋쟁이 사자처럼 7기 출신으로 `전원 컴퓨터공학 비전공자 출신 개발자`다. 실질적인 60Decibel 개발을 맡아 진행하고 있다. 
- **멋쟁이 사자처럼** : 컴퓨터공학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들 수 있도록 돕는 대학생 중심 프로그래밍 동아리로써 개발에 관한 전반적인 사항에 대해 조언을 얻었다.
- **고려대학교 의과대학팀** : 개발에 필요한 기획을 맡았으며 문진표에 명시되는 용어 및 청각장애인을 대상으로한 베타 테스트 등을 진행했다.

##### 3.2) 개발자 구성

|                             팀원                             | 역할                                                         |
| :----------------------------------------------------------: | :----------------------------------------------------------- |
| ![img](https://miro.medium.com/max/355/1*CGVdsQGdvMs0pDrwHriJUg.png) | **김승태**<br />고려대학교 영어영문학과 <br />- Vue.js / Django Rest Framework<br />- 오픈 소스 문서화 작업, 배포(AWS) 담당 |
| ![img](https://miro.medium.com/max/355/1*6TZJWeNd-rqke74FRXUFbQ.png) | **이인우**<br />고려대학교 중어중문학과<br /> - Vue.js / Django Rest Framework<br /> - 디버깅 테스트 & 코드 리팩토링, 배포(AWS) 담당 |
| ![img](https://miro.medium.com/max/355/1*VjEk7aBft9CFh_vkLEgkWw.png) | **박지환** <br />고려대학교 심리학과<br />- Vue.js / Django Rest Framework <br />- 프론트 코드 리팩토링 총괄<br /> |
| ![img](https://miro.medium.com/max/363/1*jEoNQiaQXaL29g67k8EUtw.png) | **최상하**<br />고려대학교 심리학과<br />- Vue.js / CSS<br />- 프론트 UX/UI 총괄 |
| ![img](https://miro.medium.com/max/355/1*G6wWgxKWRbIJJYdfNWag_w.png) | **박선영**<br />고려대학교 보건환경과학융합부<br />- Vue.js / Django Rest Framework<br />- Backend Serializer & Frontend About us 페이지 제작 |
| ![img](https://miro.medium.com/max/355/1*QrBPyzQjHzXDBFSZt4UK8Q.png) | **이채연** <br />고려대학교 독어독문학과<br />- Vue.js<br />-  모바일 간편 진찰 카드 기능 구성 |



### 4. 오픈소스로써의 가치

---



- 전국의 보건소 및 청각장애인들의 치료를 중심으로 운영되는 병원 등에 비치된 태블릿 PC에 활용하고자 처음부터 웹앱의 형태로 제작했다.
- 이는 의사에게 진찰을 받기 전, 문진표를 작성한다면 청각장애인 – 의사 사이의 진찰 시 필연적으로 발생하는 의사소통의 어려움을 개선할 수 있으며 의사는 진찰 과정에서 보다 정확한 진료를 해줄 수 있는 장점을 갖는다.
- 11월에 베타테스트를 거치고 앱 형태로 배포할 목적도 있습니다. 앱 출시를 염두한 이유는 병원 방문 전에 청각장애인 환자들이 미리 작성해서 가져온 문진표를 환자에게 바로 보여주고자할 요량으로 출시 계획에 포함시켰다.
- 개발자 커뮤니티에 해당 소스를 오픈소스 형태로 다수의 개발자들이 참여한다면 더 높은 수준의 서비스를 제공할 수 있을 것이다.





### 5. Design Patterns

----



 **5.1) Vuex Based on Flux**

![img](https://miro.medium.com/max/3200/1*5zOwxATnE8alOXUKnB3HOg.png)

- 접속하는 다수의 사용자 상태 변경 관리를 목적으로 Flux Design Pattern을기반으로한 Vuex를 채택했다.

- State에 작성된 상태관리 데이터를 Actions의 Commit을 통해 Mutations에 변화를 유도한다.

- 최종적으로 변경된 상태 관리 데이터가 View Components에 렌더링된다.

   

 **5.2) 시스템 구성**

![img](https://miro.medium.com/max/3200/1*jw3YdTOarDsLg-iWs1sJ5w.png)

- `Client`의 주된 접속 경로는 웹 브라우저 및 모바일 애플리케이션이 될 것이다.

- `Middleware`는 Django 내 settings.py를 반영했다.

- `Server`는 로컬에서 DRF를, 배포는 AWS EC2 - Ubuntu 환경에서 진행되었다.

- `Data`는 Sqlite를 Default DB로 Login / Profile / Survey 등 핵심적인 저장 데이터를 명시했다.

  

### 6. 아키텍처

---

- `유연성(Flexibility)`: 컴포넌트 전역에 걸쳐서 공유해야하는 상태 값들(예: 사용자 인증)을 컴포넌트에 독립적이지 않게 적용할 수 있다. 

- `확장성(Scalability)`: MVC(Model–View-Controller) 모델과 다르게 대규모 사용자에 대한 상태 값들을 처리할 수 있다.

- `유지보수성(Maintainability)`: 직관적이고 가독성 높은 코드를 작성하여 오픈소스 커뮤니티에 참여하는 개발자가 이해하기 쉽게 제작했다.

- `재사용성(Reusability)`: Components, Actions, Mutations, State를 각각 분리하여 각 단위별로 재사용 가능하게 구성했다.



### 7. 시사점

---





### 8. 맺음말

---

