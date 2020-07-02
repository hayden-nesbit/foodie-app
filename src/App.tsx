import React, { useState, useEffect } from 'react';
import {
  IonRouterOutlet, IonButtons, IonBackButton, IonTabBar, IonTabs, IonTabButton, IonBadge, IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonList, IonInput, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonCol, IonRow, IonSearchbar, IonFooter
} from '@ionic/react';
import { search, add, triangle, call, navigate, menu, home, backspace, personCircle, ellipsisHorizontal, ellipsisVertical, settings, map, informationCircle, calendar } from 'ionicons/icons';
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

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

  const [list, setList] = useState<any[]>([])
  const [view, setView] = useState<string>("list")
  const [page, setPage] = useState<any>({})
  const [searchText, setSearchText] = useState('');
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
    let viewPage = list[ind].restaurant
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
    
    let newList = [newObj, ...list]

    console.log(newList)
    setList(newList)
  
    setView("list")

  }


  let showList = list.map((item, index) => {
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
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Find your food</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{view === "search" ? "Search" : view === "add" ? "Add a spot" : "Restaurants"} </IonTitle>
            </IonToolbar>
          </IonHeader>
          {view === "list" ?
            showList
            : view === "page" ?
              <IonCard>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                  </IonButtons>
                  {/* <IonTitle>Back Button</IonTitle> */}
                </IonToolbar>
                <IonCardHeader>
                  <IonCardSubtitle>{page.cuisines}</IonCardSubtitle>
                  <IonCardTitle>{page.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonIcon size="large" icon={menu} /> <br />
                        <IonLabel>Menu</IonLabel>
                      </IonCol>
                      <IonCol>ion-col</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>ion-col</IonCol>
                      <IonCol>ion-col</IonCol>
                    </IonRow>
                  </IonGrid>
                  <IonIcon icon={navigate} />
                  <IonLabel>{page.location.address}</IonLabel> <br />
                  <IonIcon icon={call} />
                  <IonLabel>{page.phone_numbers}</IonLabel> <br />
                  {/* <IonIcon onClick={() => setView("list")} icon={backspace} size="large" /> */}
                </IonCardContent>
              </IonCard>
              : view === "search" ?
                <IonPage>
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle>Search</IonTitle>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent>
                    <IonHeader collapse="condense">
                      <IonToolbar>
                        <IonTitle size="large">Search</IonTitle>
                      </IonToolbar>
                    </IonHeader>
                    <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                  </IonContent>
                </IonPage>
                : view === "add" ?
                  <IonPage>
                    <IonHeader>
                      <IonToolbar>
                        <IonTitle>Add a spot</IonTitle>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent>
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
              <IonButton onClick={() => setView("search")}>
                <IonIcon icon={search} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={() => setView("add")}>
                <IonIcon icon={add} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="icon-only">
              <IonButton>
                <IonIcon color="light" icon={add} />
              </IonButton>
            </IonButtons>

            <IonTitle onClick={() => setView("list")}><IonIcon icon={home} /></IonTitle>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </IonApp>
  )
};

export default App;
