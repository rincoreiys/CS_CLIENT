import { defineStore } from 'pinia'
import axios from 'axios'
import pluralize from 'pluralize'
import url from 'url-join'
import {server_list} from './local'
import collect from 'collect.js'
const API = "http://127.0.0.1:3000/api"
const DEFAULT_NODE = {
  state: false,
  account: null,
  active_routine: null,
  active_index: null
}

const SAMPLE_NODE = {
  hwnd: 567,
  character: "62c44f87ae6421093b4ed3c1"
}


// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('default', {
    state: ( ) => ({
      accounts: [],
      selected_character: null,
      nodes: {
          1: DEFAULT_NODE,
          2: DEFAULT_NODE,
          3: DEFAULT_NODE,
          4: DEFAULT_NODE,
      },
      account_routines: {},
      products: [],
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
          },
      
          {
              "icon":  "fa-light fa-square-list",
              "path" : "/order"
          }
      
      ],
      on_hold_character: [], //by character, added when retrying login and stuck
      online_character: [], // added when character logged in
      stuck_character: [], // added when character stucked
      done_character: [],

      selected_node: null,
      
    }),
    getters:{
      bucket(state){
        // let {on_hold_character, online_character, stuck_character, done_character, nodes, products, accounts} = sta
        // return {on_hold_character, online_character, stuck_character, done_character, nodes, products, accounts}
        return collect(state).only(["on_hold_character", "online_character", "stuck_character", "done_character", "nodes", "products", "accounts", "account_routines"]).all()
      }
    },
    actions:{
      async save_character( dt:any){
        console.log(url(API, "account", dt._id))
        try{
          let {data} = await axios.patch(url(API, "account", dt._id), dt)
          let index = this.accounts.indexOf(this.accounts.find(a => a._id == dt._id))
          console.log(index, data)
          this.accounts[index] = data
        }catch(ex){
          console.log(ex)
        }
      },

      async save_account_priority(dt: any){
        
        let {data} = await axios.patch(url(API, "account/reorder"), dt)
        console.log(data)
        this.accounts = data
      },

      async delete_character( dt:any){
        console.log(url(API, "account", dt.id))
        axios.delete(url(API, "account", dt.id))
        .then(({data}) => {
            delete this.accounts[dt._id]
          
        })
        .catch(err => {
          console.log(err)
        })
      }
    }

  // other options...
})