import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { format } from 'date-fns';
import { Listing } from "../types/listing";

interface ListingCardProps {
  listing: Listing;
  onPress: () => void;
}

export function ListingCard({ listing, onPress }: ListingCardProps) {
  return (
    <gridLayout 
      className="bg-white rounded-lg p-4 m-2 shadow"
      rows="auto, auto, auto, auto"
      columns="*"
      onTap={onPress}
    >
      <image 
        row={0} 
        src={listing.image} 
        className="w-full h-40 rounded"
        stretch="aspectFill"
      />
      <label 
        row={1} 
        text={listing.title}
        className="font-bold text-lg mt-2"
      />
      <label 
        row={2} 
        text={listing.city}
        className="text-gray-600"
      />
      <label 
        row={3} 
        text={format(new Date(listing.createdAt), 'dd/MM/yyyy')}
        className="text-gray-500 text-sm"
      />
    </gridLayout>
  );
}