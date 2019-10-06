# 60 Decibel 

### 为听力残疾患者的开放源码移动问诊表服务

##### 																															发放日期 : 2019.10.06 / Version 1.0.7

![img](http://www.60decibel.cf/img/logo.6f8f8ca2.png)

### 文件概要

---

#####  1. 开发指导线

#####  2. 开发动机

#####  3. 开发组

#####  4. 开放源的价值

#####  5. 设计模式

##### 6. 体系结构

#####  7. 启示

#####  8. 结语



### 1.引言

---

##### 1.1) 在文件开始之前

- 栈(*stack*) 结构

  - 前端使用Vue.js & 后端使用DRF(Django Rest Framework).

    |                JavaScript 基础网页架构 Vue.js                |                   Python 基础后端架构 DRF                    |
    | :----------------------------------------------------------: | :----------------------------------------------------------: |
    | ![vue.js에 대한 이미지 검색결과](https://www.fullstackpython.com/img/logos/vuejs-wide.png) | ![drf에 대한 이미지 검색결과](https://t1.daumcdn.net/cfile/tistory/9994C4475B17C3F224) |

  - 网页架构使用模块

    |                         Vuetify                         |                    Axios(前端 & 后端通信)                    |                 Vuex(登录 & 文镇表状态管理)                  |
    | :-----------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
    | ![관련 이미지](https://kr.vuejs.org/images/vuetify.png) | ![axios에 대한 이미지 검색결과](https://assets.axios.com/8c7766945e1b76f1285485dba86f3d3a.png) | ![vuex에 대한 이미지 검색결과](https://blog.martinwork.co.kr/images/vue/vuex.png) |

  - 后端架构使用模块

    - `Json Web Token`
    - `Django Cors Headers`

```
> git clone https://github.com/RyanKor/60DB.git

# main/frontend/package.json (Vue.js 模块移动至文件位置)
> npm install (Vue.js 模块设置进行) 

# 60db
> python -m venv 60db (虚拟环境设置 pipenv or virtualenv 任何都可以使用)
> source 60db/Script/activate
> (60db) pip install -r requirements.txt (安装后端模块相关部分)
> cd main (Move to the folder manage.py is)
> Make migrations folders in profiles, survey, users app each.
> Create __init__.py in each migrations folders.
> (Move to where manage.py is) python manage.py makemigrations
> python manage.py migrate
> python manage.py createsuperuser
> (After making admin accounts) python manage.py runserver.
```

- 为确保软件运行流畅,请安装Package.json和requirements.txt上的所有模块



##### 1.2) 用语相关事项

- 为医生的正确诊断诊断使用了医学专业术语。向60Decibel 发送调查问卷及简历编写PR的开发者请注意用语使用,并填写代码. 
  - 列) survey application 内的 models.py : 腹部膨胀,腹部肿块等
- 腹部肿块等修改门诊卡功能时,请注意使用"促进"等有些用语。 



##### 1.3) 与编组件有关的事项

- 60 Decibel的早期开发团队由开发经验不足6个月的非专业学生组成。因此, 关于组件阶层及Reusable组件构成的基本知识较短,敬请理解。

- 组件构成

  ![img](https://miro.medium.com/max/778/1*SdUU_2mRkudGsk6OkQU1pw.png)

  

- 60 Decibel根据页面和功能区分了组件

  - `aboutPage` : 说明服务的目的及介绍.
  - `cardPage` :为听力残疾人与医生的沟通顺畅而包含门诊卡功能.
  - `homePage` : 连接页面时出现的管理主页的组件. 
  - `profilePage` : 表示听力残疾人的简介. 
  - `profileUploadPage` : 对听力残疾人的简介进行更新.
  - `registerPage` : 管理登录,会员加入等功能.
  - `resultsPage` :  填写手机问诊表后显示结果值.
  - `surveyPage` : 管理手机问诊表相关网页.



### 2.开发动机

---

> 开发者和非开发者都已为开放源码背上了沉重的债务。在日常生活中,从适用物联网的家电产品到直接影响软件开发的架构及库等,都处于不可或缺的地位。如果让开放源码受欢迎的最主要原因,就是开放源码可以被开发者社区验证,在服务运用上发放稳定的代码。因此,软件对人类生活的影响越大,开放源生态系统也将承担更大的作用。



- 到医院的韩国患者平均就诊时间为3分钟.
- 患者和医生都习惯于在短时间内完成诊疗,但实际上OECD国家患者的平均就诊时间是15分钟. 
- 在3分钟的时间,医生正确的的诊疗患者，是很难实现的,但很容易看到大学医院的诊疗名单上,15分钟内就有5-6名患者预约. 
- 在这种制约下,医生不可能对患者进行细致的诊断,或者对患者的疑问进行回答. 
- 在目前连普通患者都难以接受细致诊疗的医疗体系下,残疾人患者面临更加困难的局面. 
- 特别是听力残疾人,如果旁边没有人帮助沟通,就很难向医生询问自己哪里不舒服,甚至于连医生在问什么等听诊的基本问题都很难回答. 
- 说到底,即使身体不舒服,去医院看病本身更不方便,有时也会犹豫要不要去医院看病. 
- 60decibel团队为听力残疾人制作了移动门诊表软件, 希望那些对困听懂医生的话有困难的人在较短的门诊时间内进行有效的沟通和诊治. 
- 希望借此他们能够在去医院是没有负担,享受自己的基本权利.



### 3.开发组

---



##### 3.1) 合作团队介绍

|                          60 Decibel                          |                         Likelion 7th                         |                      高丽大学医科大学组                      |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://miro.medium.com/max/6500/0*8ZoDIczhINwo3S_C.png" alt="img" width="10%" height="10%" /> | <img src="https://miro.medium.com/max/1505/0*hGXvYP1axwfYC2Uz.png" alt="img" style="zoom:200%;" /> | <img src="https://miro.medium.com/max/2250/0*NWcf3ziwIZRCCShH.png" alt="img" style="zoom:200%;" /> |

- **60DB** : 是高丽大学第7期出身,全部计算机工学非专业的开发者。实际负责开发60Decibel
- **Likelion** : 非专业学生学习编程基础知识,作为帮助建立自己网站服务的大学生中心程序设计社团,得到了关于开发的整体事项的建议。
- **高丽大学医科大学组** : 高丽大学医科大学组:负责开发所需的企划,并进行了门诊表中明示的用语及以听力残疾人为对象的测试等。

##### 3.2) 开发者构成

|                             队员                             | 责任                                                         |
| :----------------------------------------------------------: | :----------------------------------------------------------- |
| ![img](https://miro.medium.com/max/355/1*CGVdsQGdvMs0pDrwHriJUg.png) | **金昇泰**<br />高丽大学英文系 <br />- Vue.js / Django Rest Framework<br />- 负责开放源文件化, 分发(AWS) |
| ![img](https://miro.medium.com/max/355/1*6TZJWeNd-rqke74FRXUFbQ.png) | **李仁祐**<br />高丽大虚中文系<br /> - Vue.js / Django Rest Framework<br /> - 负责调试测验和代码重构, 分发(AWS) |
| ![img](https://miro.medium.com/max/355/1*VjEk7aBft9CFh_vkLEgkWw.png) | **朴智桓** <br />高丽大学心理学系<br />- Vue.js / Django Rest Framework <br />- 负责前端代码重构总体管理<br /> |
| ![img](https://miro.medium.com/max/363/1*jEoNQiaQXaL29g67k8EUtw.png) | **催祥河**<br />高丽大学心理学系<br />- Vue.js / CSS<br />- 负责前端UX/UI总体管理 |
| ![img](https://miro.medium.com/max/355/1*G6wWgxKWRbIJJYdfNWag_w.png) | **朴善英**<br />高丽大学 保健环境科学融合系<br />- Vue.js / Django Rest Framework<br />- 负责 ~制作页面 |
| ![img](https://miro.medium.com/max/355/1*QrBPyzQjHzXDBFSZt4UK8Q.png) | **李彩娟** <br />高丽大学德语系<br />- Vue.js<br />-  负责手机便捷看病卡功能构成 |



### 4.开放源的价值

---



- 为了应用到以全国保健所及听力残疾人治疗为中心的医院等的平板电脑,从一开始就制作了网页应用程序.
- 在医生诊断之前,如果填写门诊表,可以改善听力残疾人人和医生之间看病时产生的沟通困难,医生在看病过程中能做出更准确的诊疗.
- 目的是在11月经过测试后以应用程序的形式发放。计划推出应用程序的理由是,在去医院之前,听障患者事先填好的门诊表,想让患者直接看到.
- 在开发者社区以开源形式共享该源代码，如果多数开发商参与进来,相信可以提供更高水平的服务.





### 5. 设计模式

----



 **5.1) Vuex Based on Flux**

![img](https://miro.medium.com/max/3200/1*5zOwxATnE8alOXUKnB3HOg.png)

- 采用基于Flux Design Pattern的Vuex,目的是对接入的多数用户状态进行变更管理.

- State制作的状态管理数据，通过Actions的Commit引导Mutations发生变化.

- 最终更改的状态管理数据被View
Components描绘.
  
  

 **5.2) 系统架构 **

![img](https://miro.medium.com/max/3200/1*jw3YdTOarDsLg-iWs1sJ5w.png)

- `Client`的主要连接途径将是浏览器及移动应用.

- `Middleware`是反映了Django内settings.

- `Server`在局部DRF, 分发在AWS EC2 - Ubuntu环境下进行.

- `Data`是Sqlite作为Default DB,明示了Login/Profile/ Survey等关键存储数据.

  

### 6. 体系结构

---

- `适应性(Flexibility)`: 可以不独立地适用于组件全域共享的状态值(例如用户认证). 
- `可扩展性(Scalability)`: 与MVC(Model–View-Controller)模式不同,可以处理大规模用户的状态值.
- `可维护性(Maintainability)`: 作于直观而可读性高的编码,让参与开源社区的开发者更容易理解.
- `可重用性(Reusability)`: 把Components, Actions, Mutations, State分别分离，让各个单位都可重新使用.



### 7. 启示

---



- 60 Decibel团队作为第一个开发项目的任务成功完成.
- 听障患者-医生门诊时,实际使用过程中,有关腹痛的转达意思可以达到**80%**.
- 修改测试过程中出现的错误，同时可以考虑如何制定稳定的代码.
- 按功能组件编成的代码便于维护,维修, 并且可以制作重复使用的代码.



### 8. 结语

---



- **开源开发的最大优点是被多数开发者可验证,具有稳定的编码**. 
- 感谢在制作过程中给予帮助的**公开开发者SW中心**导师和高丽大学毕业已经在业界工作的前辈们,今后将通过更新增加除腹痛以外的问卷调查内容.

