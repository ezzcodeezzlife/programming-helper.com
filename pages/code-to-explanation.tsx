import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import { NextScript } from "next/document"
import Select from "react-select"
import { NextSeo } from "next-seo"
import Head from "next/head"
import { signIn, signOut } from "next-auth/react"
import Script from "next/script"
import Inputareanoselect from "../components/inputareanoselect"
import Features from "../components/features"
import Recent from "../components/recent"

export default function translate() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message

  // If session exists, display content
  return (
    <>
      <Inputareanoselect
        title="Code to Explanation"
        placeholdertop={`function quicksort(array) { 
          if (array.length <= 1) {
            return array;
          }
        
          var pivot = array[0];
          
          var left = []; 
          var right = [];
        
          for (var i = 1; i < array.length; i++) {
            array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
          }
        
          return quicksort(left).concat(pivot, quicksort(right));
        };`}
        placeholderbot="This function is a quicksort algorithm. The quicksort algorithm is a sorting algorithm that sorts an array by selecting a pivot element from the array and partitioning the other elements into two subarrays, one of which contains elements less than the pivot and the other of which contains elements greater than the pivot. The algorithm then sorts the subarrays and combines them to produce the sorted array."
        buttontext="Generate Explanation"
        apipath="code-to-explanation"
      ></Inputareanoselect>

      <Features></Features>

      <Recent></Recent>
    </>
  )
}
