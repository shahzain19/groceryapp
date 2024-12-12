import React, { useEffect, useRef, useState } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { imagesData } from '../Utils/Data'; // Import your data from Data.js

const Homebanner = () => {
  const flatListRef = useRef(null); // Create a ref for FlatList
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of the image

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Automatically scroll to the next item every 3 seconds
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= imagesData.length) {
          return 0; // Loop back to the first image
        }
        return nextIndex;
      });
    }, 2000); // Interval of 3000ms (3 seconds)

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]); // Scroll to the new index when it changes

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
      <FlatList
        ref={flatListRef} // Attach the ref
        data={imagesData} // Data from Data.js
        keyExtractor={(item) => item.id}
        horizontal={true} // Makes it horizontal
        showsHorizontalScrollIndicator={false} // Hide the scroll indicator
        renderItem={({ item }) => (
          <Image
            source={item.img}
            style={styles.image} // Style for each image
          />
        )}
        snapToAlignment="center" // Ensures the item is centered
        snapToInterval={responsiveWidth(90) + 10} // Interval for snapping each image
        decelerationRate="fast" // Adjusts the deceleration speed
        contentContainerStyle={{ paddingHorizontal: 10 }} // Padding for the list
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: responsiveHeight(25),
    width: responsiveWidth(90),
    borderRadius: 20,
    marginRight: 10, // Spacing between images
  },
});

export default Homebanner;