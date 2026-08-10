# StudyFlow — Smart Study Scheduler

> Optimize your exam prep using cutting-edge algorithms. Schedule your study sessions intelligently with **Greedy Scheduling**, **Weighted Dynamic Programming**, or **Interval Partitioning** to maximize learning efficiency.

---

## 🎯 Overview

**StudyFlow** is an interactive web application that solves the **Interval Scheduling Problem** with multiple algorithmic approaches. Whether you're cramming for finals or planning long-term study blocks, StudyFlow helps you:

- ✅ **Maximize study sessions** (Greedy algorithm)
- 🎯 **Prioritize high-impact subjects** (Weighted DP)  
- 🔄 **Organize multi-track schedules** (Interval Partitioning)
- 📊 **Visualize your study plan** with Gantt charts
- 💾 **Export your schedule** as a text file

---

## ✨ Key Features

### 📋 **Three Powerful Algorithms**

1. **Greedy Scheduling** `O(n log n)`
   - Maximizes the *count* of study sessions
   - Best when all subjects matter equally
   - Provably optimal for interval scheduling
   - Classic "Activity Selection" problem

2. **Weighted Dynamic Programming** `O(n log n)`
   - Maximizes total *priority score*
   - Best for exam-critical subjects
   - Finds the highest-value subset of non-overlapping sessions
   - Weighted interval scheduling problem

3. **Interval Partitioning** `O(n log n)`
   - Schedules *ALL sessions* across parallel tracks
   - Zero sessions dropped
   - Finds minimum tracks needed for multi-day study
   - Uses greedy room assignment strategy

### 🎨 **Interactive UI**

- **Session Management**: Add, edit, remove study sessions with time blocks
- **Priority Levels**: P1 (Critical) → P4 (Low) with visual indicators
- **Real-time Updates**: Sidebar shows total sessions, selected count, and study hours
- **Sample Data**: Load 10 pre-built exam sessions to explore instantly
- **Color Coding**: 8 distinct subject colors for easy visual scanning

### 📊 **Smart Visualizations**

- **Timeline View**: Gantt chart showing selected vs. deferred sessions
- **Multi-Track View**: Visual representation of parallel study tracks
- **Study Plan Cards**: Numbered sessions with time badges and priority tags
- **Conflict Detection**: Shows which sessions overlap and why they're deferred

### ⚙️ **Responsive Design**

- Mobile-friendly sidebar with hamburger menu
- Desktop-optimized grid layout
- Sticky topbar with quick-access algorithm selector
- Glassmorphic header with backdrop blur

---

## 🚀 Getting Started

### Installation

1. Clone or download the project files:
   ```
   index.html
   style.css
   script.js
   ```

2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)

3. No build process, no dependencies — it's vanilla HTML/CSS/JS!

### Quick Start

1. **Load Sample Data** → Click "Load sample data" to populate with 10 subjects
2. **Choose Algorithm** → Navigate to "Algorithm" tab and select your strategy
3. **Generate Plan** → Click "⚡ Generate Plan" to see results
4. **Review Results** → Explore the optimal schedule with timeline and study plan
5. **Export** → Download your plan as a `.txt` file

---

## 📖 How It Works

### Adding Sessions
- **Subject/Topic**: Name of the study material (e.g., "Mathematics", "Chapter 5 Biology")
- **Start Time**: When your study session begins (24-hour format)
- **End Time**: When your study session ends
- **Priority**: P1 (most critical) to P4 (least critical)

### Algorithm Selection & Results

#### **Greedy Scheduling**
```
Input:  8 study sessions, some overlapping
Output: 5 non-overlapping sessions (maximum possible)
Score:  Optimizes for session COUNT
```
Best for: Students balancing multiple equal-weight subjects.

#### **Weighted DP**
```
Input:  8 study sessions with priority scores
Output: 4 sessions worth 14 priority points total
Score:  Optimizes for priority VALUE
```
Best for: Exam prep where some subjects are more critical.

#### **Interval Partitioning**
```
Input:  8 study sessions (possibly overlapping)
Output: 3 parallel tracks (Track 1, Track 2, Track 3)
Score:  All sessions scheduled, zero dropped
```
Best for: Multi-day study schedules or group study coordination.

### Result Metrics

| Metric | Meaning |
|--------|---------|
| **Sessions selected** | How many sessions fit the optimal plan |
| **Total study time** | Hours + minutes of selected sessions |
| **Priority score** | Sum of priority weights (Weighted DP only) |
| **Sessions deferred** | Conflicts that couldn't fit |
| **Study tracks needed** | Parallel timelines (Partitioning only) |

---

## 🛠️ Technical Stack

- **HTML5**: Semantic markup, forms, time inputs
- **CSS3**: CSS Variables, Grid/Flexbox, backdrop-filter, transitions
- **Vanilla JavaScript**: No frameworks, ~400 lines of pure logic
- **Fonts**: Syne (headings), DM Sans (body text) from Google Fonts
- **Design System**: 8-color palette with CSS custom properties

### Algorithm Implementations

All three algorithms are implemented from first principles:

```javascript
// Greedy: Sort by finish time, greedily select non-overlapping
function greedySchedule(sessions) { ... }

// Weighted DP: Binary search + dynamic programming for max priority
function weightedDP(sessions) { ... }

// Partitioning: Greedy room assignment for minimum tracks
function intervalPartition(sessions) { ... }
```

---

## 📁 Project Structure

```
studyflow/
├── index.html          # HTML structure (340 lines)
├── style.css           # Design system & layout (900+ lines)
├── script.js           # Algorithms & interactivity (400 lines)
└── README.md           # This file
```

**Total Code**: ~1,600 lines of clean, readable code

---

## 🎓 Learn More

### Interval Scheduling Problems

This app demonstrates computer science concepts:

- **Interval Scheduling Maximization** (Greedy)
  - Proof: Exchange argument shows greedy is optimal
  - Classic in CS algorithms courses (MIT 6.006, etc.)

- **Weighted Interval Scheduling** (Dynamic Programming)
  - Uses binary search for efficient lookups
  - Foundation for machine learning scheduling problems

- **Interval Partitioning** (Graph Coloring)
  - Minimum rooms problem
  - Related to bin packing and resource allocation

### Study Tips Included

The app provides science-backed study advice:
- 10-minute breaks between sessions
- Morning study for high-priority material
- Rescheduling strategies for deferred topics

---

## 🎨 Design Highlights

### Color System
- **Purple** `#7c6fff`: Primary accent (algorithms, highlights)
- **Green** `#34d399`: Success states (sessions selected)
- **Amber** `#fbbf24`: Warnings (tracks needed)
- **Red** `#f87171`: Critical priority
- **Blue** `#60a5fa`: Medium priority
- Plus 2 more for subject variety

### Responsive Breakpoints
- **Desktop**: Full sidebar + main layout
- **Mobile**: Hamburger menu, slide-out sidebar with overlay

---

## 💾 Export Format

Exported plans are human-readable:

```
StudyFlow — Optimal Study Plan
========================================
Algorithm: weighted
Generated: 8/10/2026, 2:45 PM

SELECTED SESSIONS:
----------------------------------------
1. Mathematics          08:00 – 10:00  [P1]
2. Chemistry            10:30 – 12:30  [P1]
3. Computer Science     14:00 – 16:00  [P1]
...
```

---

## 🔧 Customization

### Change Colors
Edit `:root` variables in `style.css`:
```css
:root {
  --accent: #your-color;
  --green: #your-color;
  /* etc */
}
```

### Add More Subjects
Modify `SUBJECT_COLORS` array in `script.js`:
```javascript
const SUBJECT_COLORS = [
  { bar: '#color1', text: '#color2', dark: '#color3', light: 'rgba(...)' },
  // add more...
];
```

### Adjust Time Slots
Change in `loadSample()` or manually edit HTML time inputs.

---

## 🐛 Browser Support

| Browser | Status |
|---------|--------|
| Chrome 80+  | ✅ Full support |
| Firefox 75+ | ✅ Full support |
| Safari 13+  | ✅ Full support |
| Edge 80+    | ✅ Full support |
| IE 11       | ❌ Not supported |

---

## 📝 Use Cases

- 🎓 **Student Exam Prep**: Schedule midterm/final study blocks
- 👩‍🎓 **University Planning**: Multi-subject coursework coordination
- 📚 **Online Learning**: Organize Udemy/Coursera study sessions
- 👥 **Group Study**: Coordinate schedules across study partners
- 📊 **Project Management**: Apply scheduling logic to task batching

---

## 🤝 Contributing

Feel free to:
- Add new algorithms (e.g., simulated annealing)
- Enhance UI with drag-and-drop sessions
- Add dark mode toggle
- Implement local storage persistence
- Create mobile app version

---

## 📄 License

Open source and free to use for personal and educational projects.

---

## 🎉 Credits

Built with vanilla JavaScript, demonstrating real-world applications of:
- Greedy algorithms
- Dynamic programming
- Data structure optimization

Perfect for learning or production use.

---

**Ready to ace your exams? Start scheduling now! 🚀**

Last updated: August 2026
