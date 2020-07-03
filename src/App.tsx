import React, { useState, useEffect } from 'react';
import {
  IonButtons, 
  IonText, 
  IonApp, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonList, 
  IonInput, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonCardContent, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonButton, 
  IonGrid, 
  IonCol, 
  IonRow,
  IonFooter
} from '@ionic/react';
import { add, trash, call, listOutline, navigate, home, backspace } from 'ionicons/icons';
import axios from 'axios'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './App.css'

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  const [list, setList] = useState<any[]>([])
  const [newList, setNewList] = useState<any[]>([])
  const [view, setView] = useState<string>("home")
  const [page, setPage] = useState<any>({})
  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [cuisine, setCuisine] = useState<string>();


  useEffect(() => {
    getRestaurants()
  }, []);


  async function getRestaurants() {
    await axios({
      "method": "GET",
      "url": "https://developers.zomato.com/api/v2.1/search?entity_id=742&entity_type=city",
      "headers": {
        "Accept": "application/json",
        "user-key": "914f704f49fd207b860f3749cebafe2f"
      }
    })
      .then((response) => {
        console.log(response)
        setList(response.data.restaurants)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function viewRestaurant(ind: any) {
    setView("page")
    let viewPage = option[ind].restaurant
    setPage(viewPage)
  }

  function handleSubmit() {
    let newObj = {
      "restaurant": {
        "name": name,
        "location": {
          "address": address
        },
        "cuisines": cuisine
      }
    }
    let listAdd = newList.length > 0 ? [newObj, ...newList] : [newObj, ...list]
    setNewList(listAdd)
    setView("list")
  }

  function deleteRestaurant() {
    let option = newList.length > 0 ? newList : list
    let deleteList = option.filter(item => item.restaurant.name !== page.name)
    setNewList(deleteList)
    setView("list")
  }

  let option = newList.length > 0 ? newList : list

  let showList = option.map((item, index) => {
    return (
      <IonCard key={index}>
        <IonCardHeader>
          <IonCardSubtitle>{item.restaurant.cuisines}</IonCardSubtitle>
          <IonCardTitle>{item.restaurant.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <p slot="start">rating: {item.restaurant.user_rating ? item.restaurant.user_rating.aggregate_rating : "n/a"}</p>
          <IonButton onClick={() => viewRestaurant(index)} fill="outline" size="small" slot="end">View</IonButton>

        </IonCardContent>
      </IonCard>
    )
  })


  return (
    <IonApp >
      <IonPage>
        <IonHeader>
        </IonHeader>
        <IonContent fullscreen id="home">
          <IonHeader collapse="condense">
            <IonToolbar color="dark">
              <IonTitle color="light" size="large">{view === "home" ? "Foodie" : view === "add" ? "Add a spot" : "Restaurants"} </IonTitle>
            </IonToolbar>
          </IonHeader>
          {view === "list" ?
            showList
            : view === "page" ?
              <IonCard>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setView("list")}>
                      <IonIcon icon={backspace} />
                    </IonButton>
                  </IonButtons>
                  <IonButtons slot="end">
                    <IonButton onClick={() => deleteRestaurant()}>
                      <IonIcon color="danger" icon={trash} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
                <IonCardHeader>
                  <IonCardSubtitle>{page.cuisines}</IonCardSubtitle>
                  <IonCardTitle>{page.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonText><b>Hours:</b> <br />{page.timings}</IonText>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <a href={page.menu_url} target="_blank">Menu</a>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

                  <IonIcon icon={navigate} />
                  <IonLabel> {page.location.address}</IonLabel> <br />
                  <IonIcon icon={call} />
                  <IonLabel> {page.phone_numbers}</IonLabel> <br />
                </IonCardContent>
              </IonCard>
              : view === "home" ?
                <IonPage >
                  <IonHeader>
                  </IonHeader>
                  <IonContent fullscreen id="home">
                    <IonHeader collapse="condense">
                      <IonToolbar>
                        <IonTitle size="large">Foodie</IonTitle>
                      </IonToolbar>
                    </IonHeader>
                    <IonFooter>
                      <IonGrid id="bottom">
                        <IonRow>
                          <IonCol>
                            <IonText color="light">
                              <h1>Find</h1>
                              <h1>Enjoy</h1>
                              <h1>Share</h1>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonFooter>
                  </IonContent>
                </IonPage>
                : view === "add" ?
                  <IonPage>
                    <IonHeader>
                    </IonHeader>
                    <IonContent fullscreen id="home">
                      <IonHeader collapse="condense">
                        <IonToolbar>
                          <IonTitle size="large">Add a spot</IonTitle>
                        </IonToolbar>
                      </IonHeader>
                      <IonList>
                        <IonItem>
                          <IonLabel position="floating">Restaurant name</IonLabel>
                          <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                          <IonLabel position="floating">Address</IonLabel>
                          <IonInput value={address} onIonChange={e => setAddress(e.detail.value!)}></IonInput>
                        </IonItem>
                        <IonItem>
                          <IonLabel position="floating">Cuisine</IonLabel>
                          <IonInput value={cuisine} onIonChange={e => setCuisine(e.detail.value!)}></IonInput>
                        </IonItem>
                      </IonList> <br />
                      <IonButton onClick={handleSubmit} expand="block">Add restaurant</IonButton>

                    </IonContent>
                  </IonPage>
                  :
                  null}

        </IonContent>
        <IonFooter>
          <IonToolbar color="dark">
            <IonButtons slot="start">
              <IonButton onClick={() => setView("home")}>
                <IonIcon icon={home} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => setView("add")}>
                <IonIcon icon={add} />
              </IonButton>
            </IonButtons>

            <IonTitle onClick={() => setView("list")}><IonIcon size="large" icon={listOutline} /></IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </IonApp>
  )
};

export default App;
