<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-top">
          <span class="footer-copy">Copyright © 2016-2024 VATUSA - United States Division, VATSIM. All rights reserved.</span>
          <span class="footer-disclaimer">Any and all content on this website are for use with the Virtual Air Traffic Simulation Network (VATSIM) and may not be used for real-world navigation or aviation purposes and doing so could be a violation of federal law.</span>
        </div>
      <hr>
        <div class="footer-bottom">
          <a href="https://github.com/VATUSA/MyVATUSA" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span class="footer-divider">|</span>
          <a href="https://example.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #f3f3f3;
    color: #333;
    text-align: center;
    padding: 0.5rem 0;
    margin-top: auto;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-top, .footer-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .footer-copy, .footer-disclaimer, .footer-bottom a, .footer-divider {
    margin: 0 0.5rem;
    font-size: 0.85rem;
  }
  
  .footer-bottom {
    margin-top: 1rem;
  }
  </style>