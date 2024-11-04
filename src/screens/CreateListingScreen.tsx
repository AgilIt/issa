import * as React from "react";
import { Camera } from "@nativescript/camera";
import { ImageSource } from "@nativescript/core";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type CreateListingScreenProps = {
  route: RouteProp<MainStackParamList, "CreateListing">;
  navigation: FrameNavigationProp<MainStackParamList, "CreateListing">;
};

export function CreateListingScreen({ navigation }: CreateListingScreenProps) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [city, setCity] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageBase64, setImageBase64] = React.useState<string>("");

  const takePicture = async () => {
    try {
      const image = await Camera.takePicture();
      const imageSource = ImageSource.fromFile(image.android || image.ios);
      
      // Convert to base64
      const base64String = imageSource.toBase64String("jpg", 70);
      setImageBase64(`data:image/jpeg;base64,${base64String}`);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const submitListing = async () => {
    try {
      const response = await fetch('http://your-api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          city,
          category,
          image: imageBase64,
          userId: 'temp-user-id' // Replace with actual user ID in production
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <scrollView className="flex-1 p-4 bg-white">
      <textField
        hint="Titre de l'annonce"
        text={title}
        textChange={(args) => setTitle(args.value)}
        className="p-4 border-b"
      />
      
      <textView
        hint="Description"
        text={description}
        textChange={(args) => setDescription(args.value)}
        className="p-4 h-32 border-b"
      />
      
      <textField
        hint="Ville"
        text={city}
        textChange={(args) => setCity(args.value)}
        className="p-4 border-b"
      />
      
      <dropDown
        items={["Immobilier", "Véhicules", "Emploi", "Services"]}
        selectedIndex={0}
        className="p-4 border-b"
        selectedIndexChanged={(args) => setCategory(args.value)}
      />
      
      {imageBase64 && (
        <image
          src={imageBase64}
          className="w-full h-40 my-4"
          stretch="aspectFill"
        />
      )}
      
      <button
        text="Prendre une photo"
        className="bg-gray-200 p-4 rounded my-4"
        onTap={takePicture}
      />
      
      <button
        text="Publier l'annonce"
        className="bg-blue-500 text-white p-4 rounded"
        onTap={submitListing}
      />
    </scrollView>
  );
}