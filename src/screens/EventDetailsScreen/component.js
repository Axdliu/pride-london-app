// @flow
import React, { PureComponent } from "react";
import { Image, Linking, View, StyleSheet, ScrollView } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import ContactDetails from "./ContactDetails";
import EventOverview from "./EventOverview";
import EventDescription from "./EventDescription";
import Text from "../../components/Text";
import ButtonPrimary from "../../components/ButtonPrimary";
import ContentPadding from "../../components/ContentPadding";
import Header from "../../components/Header";
import IconButton from "../../components/IconButton";
import Shadow from "../../components/Shadow";
import {
  lightishGreyColor,
  whiteColor,
  darkBlueGreyTwoColor
} from "../../constants/colors";
import text from "../../constants/text";
import type { Event, LocalizedFieldRef } from "../../data/event";
import locale from "../../data/locale";
import chevronLeftWhite from "../../../assets/images/chevron-left-white.png";
import heartWhite from "../../../assets/images/heart-white.png";

type Props = {
  navigation: NavigationScreenProp<{ params: { eventId: string } }>,
  event: Event,
  getAssetUrl: LocalizedFieldRef => string
};

const renderEventDetails = event =>
  (event.fields.accessibilityDetails ||
    event.fields.email ||
    event.fields.phone ||
    event.fields.ticketingUrl) && (
    <ContentPadding>
      <View style={styles.sectionDivider} />
      <View style={styles.content}>
        {event.fields.accessibilityDetails && (
          <View style={styles.detailsSection}>
            <Text type="h2" color="blue">
              {text.eventDetailsAccessibilityDetails}
            </Text>
            <View style={styles.accessibilityDetailsItem}>
              <Text>{event.fields.accessibilityDetails[locale]}</Text>
            </View>
          </View>
        )}
        <View style={styles.sectionDivider} />
        {(event.fields.email || event.fields.phone) && (
          <View style={styles.detailsSection}>
            <ContactDetails
              email={event.fields.email[locale]}
              phone={event.fields.phone[locale]}
            />
          </View>
        )}
      </View>
    </ContentPadding>
  );

const renderBuyTickets = event =>
  event.fields.ticketingUrl && (
    <Shadow>
      <View style={styles.buyButton}>
        <ContentPadding>
          <ButtonPrimary
            onPress={() => Linking.openURL(event.fields.ticketingUrl[locale])}
          >
            {text.eventDetailsBuyButton}
          </ButtonPrimary>
        </ContentPadding>
      </View>
    </Shadow>
  );

class EventDetailsScreen extends PureComponent<Props> {
  static defaultProps = {};

  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  render() {
    const { event, getAssetUrl } = this.props;
    return (
      <View style={styles.container}>
        <Header>
          <ContentPadding style={styles.headerContent}>
            <IconButton
              accessibilityLabel="Back"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              source={chevronLeftWhite}
            />
            <IconButton
              accessibilityLabel="Favourite"
              onPress={() => {}}
              source={heartWhite}
            />
          </ContentPadding>
        </Header>
        <ScrollView>
          <Image
            style={{ aspectRatio: 5 / 3 }}
            source={{ uri: getAssetUrl(event.fields.individualEventPicture) }}
          />
          <ContentPadding>
            <EventOverview event={event} />
            <View style={styles.sectionDivider} />
            <EventDescription event={event} />
          </ContentPadding>
          {renderEventDetails(event)}
        </ScrollView>
        {renderBuyTickets(event)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: darkBlueGreyTwoColor
  },
  content: {
    paddingVertical: 15
  },
  sectionDivider: {
    backgroundColor: lightishGreyColor,
    height: 1,
    marginVertical: 16
  },
  detailsSection: {
    marginBottom: 20
  },
  accessibilityDetailsItem: {
    marginTop: 8
  },
  buyButton: {
    backgroundColor: whiteColor,
    paddingVertical: 12
  }
});

export default EventDetailsScreen;
