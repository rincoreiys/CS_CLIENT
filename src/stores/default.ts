import { defineStore } from 'pinia'
import axios from 'axios'
import pluralize from 'pluralize'
import url from 'url-join'
import {server_list} from './local'
const API = "http://127.0.0.1:3000"
const DEFAULT_NODE = {
  hwnd: 0,
  character: null
}

const SAMPLE_NODE = {
  hwnd: 567,
  character: "62c44f87ae6421093b4ed3c1"
}


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('default', {
    state: ( ) => ({
      accounts: {},
      selected_character: null,
      nodes: {
          1: DEFAULT_NODE,
          2: DEFAULT_NODE,
          3: SAMPLE_NODE,
      },
      server_list,
      menus:[
          { 
              "icon":  "fa-light fa-circle-nodes",
              "path" : "/node"
          },
          { 
              "icon":  "fa-light fa-user",
              "path" : "/character"
          },
          { 
              "icon":  "fa-light fa-bag-shopping",
              "path" : "/shop"
          }
      
      ],
      selected_node: null,
      
    }),
    actions:{
      async save_character( dt:any){
        console.log(url(API, "account", dt.id))
        axios.patch(url(API, "account", dt.id), dt)
        .then(({data}) => {
            console.log(data)
            this.accounts[dt.id] = data
          
        })
        .catch(err => {
          console.log(err)
        })
      },
      async delete_character( dt:any){
        console.log(url(API, "account", dt.id))
        axios.delete(url(API, "account", dt.id))
        .then(({data}) => {
            delete this.accounts[dt.id]
          
        })
        .catch(err => {
          console.log(err)
        })
      }
    }

  // other options...
})