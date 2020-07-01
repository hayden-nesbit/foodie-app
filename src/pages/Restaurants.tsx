import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonCol, IonRow } from '@ionic/react';
import axios from 'axios'
import { call, navigate, menu } from 'ionicons/icons';


const RestaurantList: React.FC = () => {


  const [list, setList] = useState<any[]>([])
  const [view, setView] = useState(0)
  const [page, setPage] = useState<any>({})

  console.log(page.name)

  useEffect(() => {
    getRestaurants()
  }, [])


  function viewRestaurant(ind: any) {

    setView(1)
    let viewPage = list[ind].restaurant
    setPage(viewPage)
  }

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

  let showList = list.map((item, index) => {
    console.log(item.restaurant.name)
    return (
      <IonCard key={index}>
        <IonCardHeader>
          <IonCardSubtitle>{item.restaurant.cuisines}</IonCardSubtitle>
          <IonCardTitle>{item.restaurant.name}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          {/* Keep close to Nature's heart... and break clear away, once in awhile,
          and climb a mountain or spend a week in the woods. Wash your spirit clean. */}
          <p slot="start">rating: {item.restaurant.user_rating.aggregate_rating}</p>
          <IonButton onClick={() => viewRestaurant(index)} fill="outline" size="small" slot="end">View</IonButton>

        </IonCardContent>
      </IonCard>
    )
  })


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Find your food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Restaurants</IonTitle>
          </IonToolbar>
        </IonHeader>
        {view === 0 ?
          showList
          :
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>{page.cuisines}</IonCardSubtitle>
              <IonCardTitle>{page.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonIcon size="large" icon={menu} /> <br/>
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
              <IonLabel>{page.location.address}</IonLabel>
              <IonIcon icon={call} />
              <IonLabel>{page.phone_numbers}</IonLabel>
              <p></p>
              <p></p>
            </IonCardContent>
          </IonCard>}

      </IonContent>
    </IonPage>
  );
};

export default RestaurantList;