import React, { useEffect } from "react";
import { a, useNavigate } from "react-router-dom";
import s from "./HinduHolidaysList.module.css";
import HOC from "../../Common/HOC";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
const HinduHolidaysList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="container hindu-holiday-list">
        <BreadcrumbSection tittle={`Hindu Festivals ${new Date().getFullYear()}`} />
        <div className="holiday-list-container mt-4">
          <div className="card-view-content">
            <h2>List Of Hindu Festivals in India 2023</h2>
            <p>
              Experience the magic of Hindu festivals in India 2023 through the lens of astrology. Discover how the alignment of stars and planets influences
              the timing and energy of celebrations like Diwali, Holi, and Navratri. Unveil the mystical connections between the cosmos and these vibrant
              cultural events. Join us on a journey of celestial exploration and immerse yourself in the enchanting world of astrology during these auspicious
              festivals in 2023.
            </p>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in January</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>2 January, Monday</td>
                    <td>
                      <strong>Pausha Putrada Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>4 January, Wednesday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>6 January, Friday</td>
                    <td>
                      <strong>Paush Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>10 January, Tuesday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>15 January, Sunday</td>
                    <td>
                      <strong>Pongal</strong>
                      <strong>,</strong>
                      <strong>Uttarayan</strong>
                      <strong>,</strong>
                      <strong>Makar Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>18 January, Wednesday</td>
                    <td>
                      <strong>Shattila Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>19 January, Thursday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>20 January, Friday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>21 January, Saturday</td>
                    <td>
                      <strong>Magha Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>26 January, Thursday</td>
                    <td>
                      <strong>Basant Panchmi</strong>
                      <strong>,</strong>
                      <strong>Saraswati Puja</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in February</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>1 February, Wednesday</td>
                    <td>
                      <strong>Jaya / Bhami Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>2 February, Thursday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>5 February, Sunday</td>
                    <td>
                      <strong>Magha Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>9 February, Thursday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>13 February, Monday</td>
                    <td>
                      <strong>Kumbha Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>16 February, Thursday</td>
                    <td>
                      <strong>Vijaya Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>18 January, Saturday</td>
                    <td>
                      <strong>Mahashivratri</strong>
                      <strong>,</strong>
                      <strong>Pradosh Vrat (K)</strong>
                      <strong>, </strong>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>20 January, Monday</td>
                    <td>
                      <strong>Phalguna Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in March</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>3 March, Friday</td>
                    <td>
                      <strong>Amalaki Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>4 March, Saturday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>7 March, Tuesday</td>
                    <td>
                      <strong>Holika Dahan, Phalguna Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>8 March, Wednesday</td>
                    <td>
                      <strong>Holi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>11 March, Saturday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>15 March, Wednesday</td>
                    <td>
                      <strong>Meena Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>18 March, Saturday</td>
                    <td>
                      <strong>Papmochani Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>19 March, Sunday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>20 March, Monday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>21 March, Tuesday</td>
                    <td>
                      <strong>Chaitra Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>22 March, Wednesday</td>
                    <td>
                      <strong>Chaitra Navratri</strong>
                      <strong>,</strong>
                      <strong>Ugadi</strong>
                      <strong>,</strong>
                      <strong>Ghatasthapana</strong>
                      <strong>,</strong>
                      <strong>Gudi Padwa</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>23 March, Thursday</td>
                    <td>
                      <strong>Cheti Chand</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>30 March, Thursday</td>
                    <td>
                      <strong>Ram Navami</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>31 March, Friday</td>
                    <td>
                      <strong>Chaitra Navratri Parana</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in April</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Date and Day</b>
                    </td>
                    <td>
                      <b>Hindu Festival</b>
                    </td>
                  </tr>
                  <tr>
                    <td>1 April, Saturday</td>
                    <td>
                      <strong>Kamada Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>3 April, Monday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>6 April, Thursday</td>
                    <td>
                      <strong>Hanuman jayanti</strong>
                      <strong>,</strong>
                      <strong>Chaitra Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>9 April, Sunday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>14 April, Friday</td>
                    <td>
                      <strong>Mesha Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>16 April, Sunday</td>
                    <td>
                      <strong>Varuthini Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>17 April, Monday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>18 April, Tuesday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>20 April, Thursday</td>
                    <td>
                      <strong>Vaishakha Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>22 April, Saturday</td>
                    <td>
                      <strong>Akshaya Tritiya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in May</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>1 May, Monday</td>
                    <td>
                      <strong>Mohini Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>3 May, Wednesday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>5 May, Friday</td>
                    <td>
                      <strong>Vaishakha Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>8 May, Monday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>15 May, Monday</td>
                    <td>
                      <strong>Apara Ekadashi</strong>

                      <strong>,</strong>

                      <strong>Vrishabha Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>17 May, Wednesday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>

                      <strong>,</strong>

                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>19 May, Friday</td>
                    <td>
                      <strong>Jyeshtha Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>31 May, Wednesday</td>
                    <td>
                      <strong>Nirjala Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in June</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>1 June, Thursday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>4 June, Sunday</td>
                    <td>
                      <strong>Jyeshtha Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>7 June, Wednesday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>14 June, Wednesday</td>
                    <td style={{ cursor: "pointer" }}>
                      <strong>Yogini Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>15 June, Thursday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                      <strong>,</strong>
                      <strong>Mithuna Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>16 June, Friday</td>
                    <td style={{ cursor: "pointer" }}>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>18 June, Sunday</td>
                    <td>
                      <strong>Ashadha Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>20 June, Tuesday</td>
                    <td style={{ cursor: "pointer" }}>
                      <strong>Jagannath Rath Yatra</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>29 June, Thursday</td>
                    <td style={{ cursor: "pointer" }}>
                      <strong>Deva Shayani Ekadashi</strong>
                      <strong>,</strong>
                      <strong>Ashadhi Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in July</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>1 July, Saturday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>3 July, Monday</td>
                    <td>
                      <strong>Guru Purnima</strong>

                      <strong>,</strong>

                      <strong>Ashadha Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>6 July, Thursday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>13 July, Thursday</td>
                    <td>
                      <strong>Kamika Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>14 July, Friday</td>
                    <td style={{ cursor: "pointer" }}>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>15 July, Saturday</td>
                    <td style={{ cursor: "pointer" }}>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>16 July, Sunday</td>
                    <td>
                      <strong>Karka Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>17 July, ,Monday</td>
                    <td>
                      <strong>Shravana Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>29 July, Saturday</td>
                    <td>
                      <strong>Padmini Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>30 July, Sunday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in August</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>1 August, Tuesday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>4 August, Friday</td>
                    <td>
                      <strong>Guru Purnima</strong>
                      <strong>,</strong>
                      <strong>Ashadha Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>12 August, Saturday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>13 August, Sunday</td>
                    <td>
                      <strong>Kamika Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>14 August, Monday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>16 August, Wednesday</td>
                    <td style={{ cursor: "pointer" }}>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>16 July, Sunday</td>
                    <td>
                      <strong>Karka Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>17 July, ,Monday</td>
                    <td>
                      <strong>Shravana Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>29 July, Saturday</td>
                    <td>
                      <strong>Padmini Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>30 July, Sunday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in September</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>2 September, Saturday</td>
                    <td>
                      <strong>Kajari Teej</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>3 September, Sunday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>7 September, Thursday</td>
                    <td>
                      <strong>Janmashtami</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>10 September, Sunday</td>
                    <td>
                      <strong>Aja Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>12 September, Tuesday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>13 September, Wednesday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>14 September, Thursday</td>
                    <td>
                      <strong>Bhadrapada Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <strong>Kanya Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>18 September, Monday</td>
                    <td>
                      <strong>Hartalika Teej</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>19 September, Tuesday</td>
                    <td>
                      <strong>Ganesh Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>25 September, Monday</td>
                    <td>
                      <strong>Parivartini Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>27 September, Wednesday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>28 September, Thursday</td>
                    <td>
                      <strong>Anant Chaturdashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>29 September, Friday</td>
                    <td>
                      <strong>Bhadrapada Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in October</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>2 October, Monday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>10 October, Tuesday</td>
                    <td>
                      <strong>Indira Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>11 October, Wednesday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>12 October, Thursday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>14 October, Saturday</td>
                    <td>
                      <strong>Ashwin Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>15 October, Sunday</td>
                    <td>
                      <strong>Sharad Navratri</strong>
                      <strong>, </strong>
                      <strong>Ghatasthapana</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>18 October, Wednesday</td>
                    <td>
                      <strong>Tula Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>20 October, Friday</td>
                    <td>
                      <strong>Kalparambha</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>21 October, Saturday</td>
                    <td>
                      <strong>Navpatrika Puja</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>23 October, Monday</td>
                    <td>
                      <strong>Durga Maha Navami Puja</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>24 October, Tuesday</td>
                    <td>
                      <strong>Durga Visarjan</strong>
                      <strong>, </strong>
                      <strong>Dussehra</strong>
                      <strong>,</strong>
                      <strong>Sharad Navratri Parana</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>25 October, Wednesday</td>
                    <td>
                      <strong>Papankusha Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>26 October, Thursday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>28 October, Saturday</td>
                    <td>
                      <strong>Ashwin Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in November</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>1 November, Wednesday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                      <strong>,</strong>
                      <strong>Karva Chauth</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>9 November, Thursday</td>
                    <td>
                      <strong>Rama Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>10 November, Friday</td>
                    <td>
                      <strong>Dhanteras</strong>
                      <strong>,</strong>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>11 November,Saturday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>12 November, Sunday</td>
                    <td>
                      <strong>Diwali</strong>
                      <strong>,</strong>
                      <strong>Narak Chaturdashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>13 November, Monday</td>
                    <td>
                      <strong>Kartik Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>14 November, Tuesday</td>
                    <td>
                      <strong>Govardhan Puja</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>15 November, Wednesday</td>
                    <td>
                      <strong>Bhai Dooj</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>17 November, Friday</td>
                    <td>
                      <strong>Vrischika Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>19 November, Sunday</td>
                    <td>
                      <strong>Chhath Puja</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>23 November, Thursday</td>
                    <td>
                      <strong>Devutthana Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>24 November, Friday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>27 November, Monday</td>
                    <td>
                      <strong>Kartik Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>30 November, Thursday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hindu Festivals 2023 in December</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Date and Day</strong>
                    </td>
                    <td>
                      <strong>Hindu Festival</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>8 December, Friday</td>
                    <td>
                      <strong>Utpanna Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>10 December, Sunday</td>
                    <td>
                      <strong>Pradosh Vrat (K)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>11 December, Monday</td>
                    <td>
                      <strong>Masik Shivaratri</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>12 December, Tuesday</td>
                    <td>
                      <strong>Margashirsha Amavasya</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>16 December, Saturday</td>
                    <td>
                      <strong>Dhanu Sankranti</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>23 December, Saturday</td>
                    <td>
                      <strong>Mokshada Ekadashi</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>24 December, Sunday</td>
                    <td>
                      <strong>Pradosh Vrat (S)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>26 December, Tuesday</td>
                    <td>
                      <strong>Margashirsha Purnima Vrat</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>30 December, Saturday</td>
                    <td>
                      <strong>Sankashti Chaturthi</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HOC(HinduHolidaysList);
