import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import axios from 'axios'

const RestaurantList: React.FC = () => {

  const [list, setList] = useState([])

  console.log(list)

  useEffect(() => {
    getRestaurants()
  }, [])

  function getRestaurants() {
    axios({
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CardExamples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Restaurants</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle >Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          <IonItem>
              <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantList;