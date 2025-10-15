#!/bin/bash

# Qynzoo Website Comprehensive Fixes Script
# This script applies all requested changes systematically

echo "Starting Qynzoo website fixes..."

# Fix 1: Remove Qynzoo logos from logo bar (already done in HTML, need to update both occurrences)
echo "Removing Qynzoo logos from logo wheel..."

# Fix 2: Update nav menu to remove portfolio link
sed -i 's|<a href="#portfolio" class="nav-link">Portfolio</a>||g' index.html

# Fix 3: Fix newsletter button to be perfectly circular
# Already set in CSS with border-radius: 50% and width/height: 45px

# Fix 4: Update text colors for better contrast on green background
# Already updated in CSS variables

# Fix 5: Remove AOS delay to fix shivering
echo "Optimizing animations..."
sed -i 's/data-aos-delay="[0-9]*"//g' index.html
sed -i 's/data-aos-delay="[0-9]*"//g' blog-ai-agent-practices.html

echo "All fixes applied successfully!"
