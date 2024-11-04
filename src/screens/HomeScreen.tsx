import * as React from "react";
import { ObservableArray } from "@nativescript/core";
import { Listing } from "../types/listing";
import { ListingCard } from "../components/ListingCard";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type HomeScreenProps = {
  route: RouteProp<MainStackParamList, "Home">;
  navigation: FrameNavigationProp<MainStackParamList, "Home">;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [selectedCity, setSelectedCity] = React.useState<string>("");

  const categories = ["Tous", "Immobilier", "Véhicules", "Emploi", "Services"];
  
  React.useEffect(() => {
    fetchListings();
  }, [selectedCategory, selectedCity]);

  const fetchListings = async () => {
    try {
      // TODO: Implement API call
      const response = await fetch('http://your-api/listings');
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  return (
    <flexboxLayout className="flex-1 bg-gray-100">
      <scrollView orientation="horizontal" className="h-12 bg-white">
        {categories.map((category) => (
          <button
            key={category}
            className={`p-2 m-1 rounded ${
              selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            text={category}
            onTap={() => setSelectedCategory(category)}
          />
        ))}
      </scrollView>
      
      <searchBar
        hint="Rechercher une ville..."
        textChange={(args) => setSelectedCity(args.value)}
        className="m-2"
      />

      <listView
        items={new ObservableArray(listings)}
        itemTemplate={(item: Listing) => (
          <ListingCard
            listing={item}
            onPress={() => navigation.navigate("ListingDetail", { listingId: item.id })}
          />
        )}
        className="flex-1"
      />

      <button
        className="bg-blue-500 text-white rounded-full w-14 h-14 text-2xl"
        text="+"
        onTap={() => navigation.navigate("CreateListing")}
      />
    </flexboxLayout>
  );
}