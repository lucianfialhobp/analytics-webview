/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START log_event]
function logEvent(name, params) {
  if (!name) {
    return;
  }

  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
  } else if (window.webkit
      && window.webkit.messageHandlers
      && window.webkit.messageHandlers.firebase) {
    // Call iOS interface
    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
}
// [END log_event]

// [START set_user_property]
function setUserProperty(name, value) {
  if (!name || !value) {
    return;
  }

  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.setUserProperty(name, value);
  } else if (window.webkit
      && window.webkit.messageHandlers
      && window.webkit.messageHandlers.firebase) {
    // Call iOS interface
    var message = {
      command: 'setUserProperty',
      name: name,
      value: value
   };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
}
// [END set_user_property]

// View list events
document.getElementById("view_item").addEventListener("click", function() {
  console.log("view_item");
  logEvent("view_item", {item_category: "Camisa", item_name: "Polo Piquet", item_id: "1234", price: 139.9, currency: "BRL" });
});

document.getElementById("view_item_list").addEventListener("click", function() {
  console.log("view_item_list");
  logEvent("view_item_list", {item_category: "Camisa"});
});


document.getElementById("view_search_results").addEventListener("click", function() {
  console.log("view_search_results");
  logEvent("view_search_results", { search_term: "Masculino" });
});



// Funnel events
document.getElementById("add_to_cart_goods").addEventListener("click", function() {
    console.log("add_to_cart_goods");
    logEvent("add_to_cart_goods", { quantity: 1, item_category: "Camisa", item_name: "Polo Piquet", item_id: "1234", price: 139.9, currency: "BRL" });
});

document.getElementById("begin_checkout_goods").addEventListener("click", function() {
  console.log("begin_checkout_goods");
  logEvent("begin_checkout_goods", { coupon: "bar", currency: "BRL"});
});

document.getElementById("choose_shipping_method_goods").addEventListener("click", function() {
  console.log("choose_shipping_method_goods");
  logEvent("choose_shipping_method_goods", { shipping_method: "Delivery" });
});

document.getElementById("add_payment_info_goods").addEventListener("click", function() {
  console.log("add_payment_info_goods");
  logEvent("add_payment_info_goods", { payment_method: "MasterCard" });
});

document.getElementById("purchase_gd").addEventListener("click", function() {
  console.log("ecommerce_purchase_goods");
  logEvent("ecommerce_purchase_goods", { coupon: "TESTE", currency: "BRL", value: 146.9, tax: 1, shipping: 6.9, transaction_id: "T-1234-" + Math.random()});
});


document.getElementById("event2").addEventListener("click", function() {
  console.log("event2");
    logEvent("event2", { size: 123.456 });
});

document.getElementById("userprop").addEventListener("click", function() {
    console.log("userprop");
    setUserProperty("userprop", "custom_value");
});
