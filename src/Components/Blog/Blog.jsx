import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import a from "../../images/sign.png";
import "./Blog.css";
import { notificationHandler } from "../utils/Notification";
import { useNavigate } from "react-router-dom";
//tab pannel
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Skeleton, Card, CardContent } from "@mui/material";
//SEO
import SEO from "../Seo/seo";
import blogapi, { blog_list_api, get_blogapi } from "../api/blogapi";
import DataNotFound from "../DataNotFound";
const Blog = () => {
  const [isloading, setisloading] = useState(false);
  const [BlogAllCategories, setBlogAllCategories] = useState([]);
  const [CategoriesId, setCategoriesId] = useState("");
  const [active, setactive] = useState(0);
  const [name, setname] = useState("");
  const [BlogListArry, setBlogListArry] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 530,
      behavior: "smooth",
    });
    // blogsection();
  }, []);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    blogcategories();
  }, []);

  ///blog catogries
  const blogcategories = async () => {
    setisloading(true);
    try {
      const res = await blogapi();
      if (res?.data?.status) {
        setBlogAllCategories(res?.data?.results);
        setCategoriesId(res?.data?.results[0]?.id);
        const ID = res?.data?.results[0]?.id;

        if (!ID == undefined) {
          return;
        }
        blogsection(ID);
        setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  ///api integration get Blog Detail
  const blogsection = async (id) => {
    setactive(0);
    setisloading(true);
    try {
      const res = await blog_list_api();
      if (res.data.status) {
        setBlogListArry(res?.data?.results);
        setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };
  const filterCategoryDataArr = BlogListArry.filter((event) => {
    return event.title.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  });

  const blogdata = async (data, index) => {
    setactive(index + 1);
    setCategoriesId(data.id);
    setisloading(true);
    try {
      const res = await get_blogapi(data?.id);
      if (res.data.status) {
        setBlogListArry(res.data.results);
        setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
        console.log("data response error:::", res);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const styles = {
    root: {
      padding: "0px",
    },
  };

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <div
              style={{ width: "40%", margin: "5px" }}
              key={index}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
              >
                <div style={{ paddingTop: "87%" }} />
              </Skeleton>
              <Box sx={{ display: "block", marginTop: "2px" }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={22}
                />
              </Box>
              <Skeleton />
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <SEO
        title="Blog - Free Online Astrology Predictions by Best Astrologer"
        description="AstroPush is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        <div className="blog_banner p-5">
          <div className="container">
            <div
              className="d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <div
                className="freekundli_content"
                style={{ width: "50%" }}
              >
                <h2
                  className="banner_heading pt-4"
                  style={{ color: "#FFF", textTransform: "uppercase" }}
                >
                  AstroPush Blog
                </h2>
                <span className="header_banner pt-5">Read Our Latest Blog</span>
              </div>
              <div
                className="sing_image"
                id="myDIV"
              >
                <img src={a} />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <section className="blog container mt-2 mb-2">
            <div className="blogcard">
              <div className="ourastologer_content text-center">
                <h2 className="blog_sec pb-2 mt-5">What’s new on the blog</h2>
              </div>
              <div className="search_box_astromall_new mt-5">
                <input
                  type="search"
                  name="productSearch"
                  id="productSearch"
                  className="mat-autocomplete-trigger ng-valid ng-touched ng-dirty"
                  placeholder="Let's find what you're looking for..."
                  role="combobox"
                  aria-expanded="false"
                  aria-haspopup="true"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
                <i className="fa fa-search"></i>
              </div>

              <Box
                sx={{
                  flexGrow: 1,
                  width: "100%",
                  bgcolor: "background.paper",
                  display: "block",
                }}
                className="text-center"
                style={styles.root}
              >
                <Tabs
                  // orientation="horizontal"
                  // centered={true}
                  indicatorColor="primary"
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    // key={index}
                    label="All"
                    // style={styles.root}
                    {...a11yProps(0)}
                    onClick={() => blogsection(CategoriesId)}
                    indicatorColor="primary"
                    // style={{ minWidth: "50%" }}
                    variant="fullWidth"
                  />
                  {BlogAllCategories.map((data, index) => (
                    <Tab
                      key={index}
                      label={data.name}
                      // style={styles.root}
                      {...a11yProps(active)}
                      onClick={() => blogdata(data, index)}
                      indicatorColor="primary"
                      // style={{ minWidth: "50%" }}
                      variant="fullWidth"
                    />
                  ))}
                </Tabs>

                <TabPanel
                  value={value}
                  index={active}
                  style={styles.root}
                >
                  {!isloading ? (
                    <div className="row">
                      {filterCategoryDataArr.length > 0 ? (
                        filterCategoryDataArr?.map((data, index) => (
                          <div
                            className="col-md-6 col-lg-6 col-xl-4"
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/blog/${data.meta_link}`, {
                                state: {
                                  categoryid: CategoriesId,
                                  id: data.id,
                                  meta_link: data.meta_link,
                                },
                              })
                            }
                          >
                            <div
                              className="blog_box_content m-2 "
                              style={{ height: "auto" }}
                            >
                              <div className="blog_section_image">
                                <img
                                  src={data.img}
                                  alt="blog"
                                />
                              </div>
                              <div
                                className="p-2 "
                                style={{ textAlign: "left" }}
                              >
                                <h5>{data?.title}</h5>
                                {/* <h5>{data?.title.substring(0, 43) + "..."}</h5> */}
                                {/* <span
                                  dangerouslySetInnerHTML={{
                                    __html: data?.description.substring(0, 100) + "...",
                                  }}
                                ></span> */}
                              </div>
                              <div
                                className="d-flex p-2"
                                style={{ justifyContent: "space-between" }}
                              >
                                <div
                                  className=""
                                  style={{ color: "#777" }}
                                >
                                  {data?.auther}
                                </div>
                                <div style={{ color: "#777" }}>
                                  {data?.Created_date.substring(0, 10)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <DataNotFound />
                      )}
                    </div>
                  ) : (
                    <>
                      <div
                        className="d-flex"
                        style={{ width: "100%" }}
                      >
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                      </div>
                      <div
                        className="d-flex"
                        style={{ width: "100%" }}
                      >
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                      </div>
                      <div
                        className="d-flex"
                        style={{ width: "100%" }}
                      >
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                        <ListSkeleton
                          listsToRender={1}
                          width="200"
                        />
                      </div>
                    </>
                  )}
                </TabPanel>
              </Box>
            </div>
          </section>
          <section className="container">
            <div className="pb-2">
              <h3 className="pb-2 mt-5">
                Your Portal to Astrology 2023 and Beyond!
              </h3>

              <p>
                Get on a transformative journey of self-discovery and universal
                exploration with AstroPush. As we step into the kingdom of
                Astrology 2023, our online platform becomes your portal to deep
                insights and spiritual guidance. Through these blogs, we invite
                you to immerse yourself in the world of astrology, where you can
                chat with astrologers online, connect with the best astrologers
                in the field, and undo the mysteries of the universe.
              </p>
              <p>
                At <a href={window.location.origin}>Astropush</a>, we understand
                that life's questions often lead us to the stars. If you have
                questions about love, work, relationships, or finding your
                life's purpose, we can help. Our platform lets you talk to the
                best astrologers from all over the world online or in person.
                Our experts will share their knowledge and insights with you, so
                you can make confident decisions and feel clearer about your
                life's journey. Our renowned Astrologers at AstroPush can help
                you with the detailed Kundli analysis over chat/call.
              </p>
              <p>
                As we search the paths of the stars in Astrology 2023, we
                welcome you to join us in the world of Online Astrology. The
                AstroPush Blog is here to be your guide, providing you with lots
                of helpful information, articles, and tools that will help you
                understand the insights of the universe. Together, let's make
                this year a time of connecting with the outer space, learning
                about ourselves, and experiencing positive changes.
              </p>
              <p>
                Also, if you wish to personally talk and chat online with our
                best astrologers, you’re just a click away. Our "Ask the
                Astrologer" feature allows you to submit your questions and
                receive personalized answers from our experienced astrologers.
                Our renowned Astrologers at AstroPush can help you with detailed
                Kundli analysis over chat/call.
              </p>
            </div>
          </section>
          <section className="container">
            <div className="pb-2">
              <h3 className="pb-2 mt-3">
                Exploring the World of Online Astrology with our Blogs
              </h3>

              <p>
                We're happy to have you on our astrology blog! Welcome to our
                exciting online astrology blog page, where we'll take you on a
                journey to explore the secrets of the universe.
              </p>
              <p>
                Our Blogs are divided into your various areas of interest such
                as Entertainment, Vedic Astrology, Tarot, Vastu, Kundli, Sports,
                Transits, Indian festivals, gemstones, numerology, zodiac signs,
                mythology, daily horoscope etc.
              </p>
              <p>
                <strong>Here's what you can expect to find:</strong>
              </p>
              <p>
                <strong>The Dance of the Stars:</strong>
              </p>
              <p>
                We'll show you how the planets and stars move in the sky,
                affecting our lives in fascinating ways.
              </p>
              <p>
                <strong>Interesting Articles:</strong>
              </p>
              <p>
                We have a variety of articles with interesting topics suitable
                for astrology enthusiasts.
              </p>
              <p>
                <strong>Understanding Birth Charts:</strong>
              </p>
              <p>
                Ever wondered what those symbols on a birth chart/kundli mean?
                We'll simplify it for you, so you can understand what the stars
                say about you and get answers to your astrology or kundli
                related questions.
              </p>
              <p>
                <strong>Life Guidance:</strong>
              </p>
              <p>
                Discover how astrology can give advice and insights about
                different areas of your life, such as relationships and
                opportunities.
              </p>
              <p>
                <strong>Exploring Different Aspects:</strong>
              </p>
              <p>
                We'll dive into different areas of astrology, like how the
                planets move and what your zodiac sign means.
              </p>
            </div>
          </section>
          <section className="container">
            <div className="pb-2">
              <h3 className="pb-2 mt-3">
                Get ready for an amazing journey through the world of astrology!
                We'll explore the secrets of the universe and discover
                fascinating truths about our lives.
              </h3>

              <p>
                <strong>Here's what you can expect:</strong>
              </p>
              <p>
                <strong>Discover Spiritual Journey:</strong>
              </p>
              <p>
                We'll dive into the ancient knowledge that connects the stars
                and planets to our life. Learn how their arrangements shape our
                destinies.
              </p>
              <p>
                <strong>Find Clarity and Guidance:</strong>
              </p>
              <p>
                As we explore astrology, you'll gain a deeper understanding of
                how celestial bodies influence your experiences, relationships,
                and personal growth. Let their insights guide you.
              </p>
              <p>
                <strong>Connect the Past and Present:</strong>{" "}
              </p>
              <p>
                Discover how the knowledge of the past still applies to our
                lives today. We'll connect the dots between ancient knowledge
                and modern living.
              </p>
              <p>
                <strong>Improve Your Well-being:</strong>
              </p>
              <p>
                Learn about the link between astrology and good health. Discover
                how planets influence your physical, mental, and emotional
                health.
              </p>
              <p>
                <strong>Get Answers to Your Questions:</strong>
              </p>
              <p>
                Have questions about astrology? Our "Ask the Astrologer" feature
                allows you to submit your questions and receive personalized
                answers from our experienced astrologers. Our renowned
                Astrologers at AstroPush can help you with detailed Kundli
                analysis over chat/call.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default HOC(Blog);
