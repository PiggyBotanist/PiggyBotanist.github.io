#
# Week 1 Activity
# Visualizing Geographic Data
# 2024-10-24
#
####################

# R 101
###################
# - Any line that begins with a '#' is a comment and will not be interpreted as code
# - The arrow symbol '<-' is called the assignment operator 

# The library function loads tidyverse into our environment and allows us to access
# its functions
library(tidyverse) 
library(countrycode)

# The following line pulls in data from the Tidy Tuesday Repository
tuesdata<-tidytuesdayR::tt_load("2024-10-22") 
factbook_df<-tuesdata$cia_factbook

# We can use the view function to look at the data in an Excel style table
View(tuesdata$cia_factbook)

# The %>% or 'pipe' symbol allows us to  pipe the output into a new command
factbook_df %>% summary()

# We will only look at regions with an area of greater than 0
factbook_df<-factbook_df %>%
    filter(area>0)

map.base<-map_data("world") 


# We can create a simple map of the world using ggplot.
# ggplot is a function that allows us to quickly make robust charts.
map.base %>% 
    filter(region != "Antarctica")%>% # Remove Antarctica 
    ggplot(
        aes(x=long, y=lat)
    )+
    geom_polygon(
        aes(group=group),
        color="black"
    )+
    theme_void()

# Check for region naming differences (e.g United States vs USA)
factbook_df %>% 
   rename(region = country) %>%
   anti_join(map.base, by="region")


# Our result showed us that there are 49 countries (regions) that do share the 
# same name. This will cause problems in our final map.
factbook_df_iso<-factbook_df %>% 
    # Remove any country that does not have population or internet user data
    filter(!is.na(population) & !is.na(internet_users)) %>%
    # Convert name to ISO 3 Numeric char standard 
    mutate(iso=countrycode(country, origin="country.name", destination = "iso3n"))
    

map_base_iso<-map.base %>%
    # Remove Antarctica from the map
    filter(region != "Antarctica")%>%
    # Convert name to ISO 3 Numeric char standard 
    mutate(iso=countrycode(region, origin="country.name", destination = "iso3n"))

# We review the anti-join result and find that it is much better!
# Now we only have 7 countries that don't overlap 
factbook_df_iso %>% 
    anti_join(map_base_iso, by="iso")

# Next, we create a 
map_df<- map_base_iso %>%
    left_join(factbook_df_iso, by="iso")

# Plotting the final map!
map_df %>% 
    ggplot(
        aes(x=long, y=lat)
    )+
    geom_polygon(
        aes(group=group, fill=((internet_users/population)*100)),
        color="black"
    )+
    theme_void()+
    labs(title="Intenet Users Per Capita")
