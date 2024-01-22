import { Tab, Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CartEntry, useMenuStore } from "../store";


export const MenuItemsDisplay = (props: { showImage: boolean, fontSize?: string, backgroundColor?: string, addPaddingToImage: boolean, cart: CartEntry[], setCart: React.Dispatch<React.SetStateAction<CartEntry[]>> }) => {
  const menuItems = useMenuStore((state) => state.menuItems);
  const itemCategories = useMenuStore((state) => state.itemCategories);
  const [tabValue, setTabValue] = useState(1);
  const addtoCart = (id: number) => {
    props.setCart(
      props.cart.find((entry) => entry.itemId === id)
        ? props.cart.map((entry) => {
          if (entry.itemId === id) {
            return { itemId: entry.itemId, quantity: entry.quantity + 1 };
          }
          return entry;
        })
        : [...props.cart, { itemId: id, quantity: 1 }]
    );
  };

  const paperStyle = {
    padding: "20px",
    backgroundColor: props.backgroundColor ?? "#f3f3f3",
  } as any;

  return (
    <Paper style={paperStyle}>
      <Tabs
        value={tabValue}
        onChange={(_, newValue) => setTabValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="basic tabs example"
        sx={{ marginBottom: '32px' }}
      >
        {itemCategories.map((category) => (
          <Tab label={category.name} key={category.id} value={category.id}/>
        ))}
      </Tabs>

      {
        itemCategories.map((category) => (
          <div
            key={category.id}
            style={{ display: tabValue === category.id ? "block" : "none" }}
          >
            <Grid
              container
              spacing={4}
              rowGap={4}
              sx={{ height: "90vh", overflowY: "scroll" }}
              alignItems="stretch"
            >
              {menuItems
                .filter((menuItem) => menuItem.categoryId === category.id)
                .filter((v, i, a) => a.map(v => v.name).indexOf(v.name) === i) // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
                .map((menuItem) => (
                  <Grid item key={menuItem.id} xs={3} style={{ height: "250px" }} >
                    <Button
                      variant="text"
                      color="primary"
                      style={{ height: "100%" }}
                      onClick={() => {
                        addtoCart(menuItem.id!);
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}><Paper
                        elevation={3}
                        style={{
                          padding: props.addPaddingToImage ? "30px" : "0px",
                          height: "100%",
                          textAlign: "center",
                          backgroundImage: props.showImage
                            ? `url(${menuItem.imageUrl})`
                            : "none",
                          backgroundSize: "cover",
                        }}
                      >
                        {props.showImage && (
                          <div
                            style={{ height: "100px", width: "100px" }}
                          ></div>
                        )}
                      </Paper>
                        <Typography variant="h6" style={{
                          color: 'white',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          height: '120px',
                          width: '200px',
                          borderRadius: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        >
                          {menuItem.name} <br />${menuItem.price.toFixed(2)}
                        </Typography></div>

                    </Button>
                  </Grid>
                ))}
            </Grid>
          </div>
        ))
      }
    </Paper >
  );
};
