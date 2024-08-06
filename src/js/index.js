// Navigation menu

const btn = document.querySelector(".bx-menu");

const handleClick = () => {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
  menu.classList.remove("showmenu");
  const navMenu = document.getElementsByClassName("nav__menus");
  navMenu.classList.add("hide");
};

btn.addEventListener("click", handleClick);

// background changer

// music function

const allSongs = [
  {
    id: 0,
    name: "lucid dream",
    artist: "Juice wrld",
    duration: "5:14",
    url: "https://ia802808.us.archive.org/2/items/juicewrldluciddreamsdir.bycolebennett/Juice%20WRLD%20-%20Lucid%20Dreams%20%28Dir.%20by%20ColeBennett%29.mp3?cnt=0",
  },

  {
    id: 1,
    name: "The Box",
    artist: "Roddy ricch",
    duration: "4:38",
    url: "https://ia803203.us.archive.org/7/items/clorse/Roddy%20Ricch%20-%20The%20Box%20%5BOfficial%20Audio%5D.mp3?cnt=0",
  },

  {
    id: 2,
    name: "God's plan",
    artist: "Drake",
    duration: "3:31",
    url: "https://ia800702.us.archive.org/16/items/DrakeGodsPlan_201810/Drake%20-%20God%E2%80%99s%20Plan.mp3?cnt=0",
  },

  {
    id: 3,
    name: "one dance",
    artist: "drake",
    duration: "3:01",
    url: "https://archive.org/serve/onedance_drake/12.%20One%20Dance%20%28Ft.%20Wizkid%20%26%20Kyla%29.mp3",
  },

  {
    id: 4,
    name: "Controller",
    artist: "drake",
    duration: "5:14",
    url: "https://ia801309.us.archive.org/17/items/ControllaDrkeFeatPopcaan/Controlla-drke%20feat%20popcaan.mp3?cnt=0",
  },
];

let userSongs = {
  song: [...allSongs],
  currentSongTime: 0,
  currentSong: null,
};

const audio = new Audio();

// Display the song to the  UI

const displaySong = (array) => {
  const songsHtml = array
    .map((song) => {
      return `
      <div class="song__wrapper" id="song-${song.id}">
      <div class="song__details flex">
            <p>Name</p>
            <p>Artist</p>
            <p>Duration</p>
        </div>
     
            <div class="allTheSongs flex playTheSong">
            <p class="play-by-name">${song.name}</p>
          <p class="play-by-artist">${song.artist}</p>
          <p class="play-by-duration">${song.duration}</p>
        
          <div class="close" arial-label="Delete" id="${song.id}" onclick="deleteSong(${song.id})">
         <i class='bx bx-x'></i>
          </div>
         

            </div>
  

`;
    })
    .join(" ");

  document.querySelector(".lists").innerHTML = songsHtml;
};

// displaySong(userSongs?.song);

// Sorting the songs in an alphabetical order

const sortSong = () => {
  userSongs?.song.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return userSongs?.song;
};
displaySong(sortSong());

//Implementing the play song

const playSong = (id) => {
  const song = userSongs?.song.find((song) => song.id === id);
   console.log(song , id, song.id)
  audio.src = song?.url;
  audio.title = song?.name;

  if (userSongs.currentSong === null || userSongs.currentSong.id === song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userSongs.currentSongTime;
  }
  userSongs.currentSong = song;
  highlight();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const playButton = document.querySelector(".play");

playButton.addEventListener("click", () => {
  if (userSongs?.currentSong === null) {
    playSong(userSongs.song[0].id);
   }  else {
     playSong(userSongs.currentSong.id);
   }
  handleBackgroundChanger();
});

// implementing the pauseSong

const pauseSong = () => {
  userSongs.currentSongTime = audio.currentTime;
  audio.pause();
  handleBackgroundChanger();
};

const pauseButton = document.querySelector(".pause");

pauseButton.addEventListener("click", pauseSong);

//getting the current song index

const getIndexOfCurrentSong = () => {
  return userSongs.song.indexOf(userSongs.currentSong);
};

// implementing the next nextsong

const nextSong = () => {
  if (userSongs?.currentSong === null) {
    playSong(userSongs.song[0].id);
  } else {
    const currentSongIndex = getIndexOfCurrentSong();
    const nextSongToSing = userSongs.song[currentSongIndex + 1];
    playSong(nextSongToSing.id);
    console.log(currentSongIndex);
  }
  handleBackgroundChanger();
};

const nextButton = document.querySelector(".next");

nextButton.addEventListener("click", nextSong);

// implementing the previous song
const previousSong = () => {
  if (userSongs?.currentSong === null) {
    playSong(userSongs.song[0].id);
  } else {
    const currentSongIndex = getIndexOfCurrentSong();
    const previousSongToSing = userSongs.song[currentSongIndex - 1];
    playSong(previousSongToSing.id);
  }
  handleBackgroundChanger();
};

const previousButton = document.querySelector(".previous");

previousButton.addEventListener("click", previousSong);

//implementing the song highlight

const highlight = () => {
  const playLists = document.querySelectorAll(".song__wrapper");
  const songHighlighted = document.getElementById(
    `song-${userSongs?.currentSong?.id}`
  );

  playLists.forEach((list) => {
    list.removeAttribute("aria-current");
  });
  if (songHighlighted) songHighlighted.setAttribute("aria-current", "true");
};

//implementing the song highlight
const setPlayerDisplay = () => {
  const displaySongPlaying = document.querySelector(".higlight-name-display");

  const currentTitle = userSongs?.currentSong?.name;
  const currentArtist = userSongs?.currentSong?.artist;


  displaySongPlaying.innerHTML = ` 
  <div class="flex">
  ${currentArtist ? currentArtist : ""} -
  ${currentTitle ? currentTitle : ""} 
  </div>
  `;
};

const setPlayButtonAccessibleText = () => {
  const song = userSongs.currentSong || userSongs.song[0];
  playButton.setAttribute(
    "aria-label",
    song.name ? `Play ${song.name}` : "play"
  );
};

const shuffle = () => {
  userSongs.song.sort(() => Math.random() - 0.5);
  userSongs.currentSong = null;
  userSongs.currentSongTime = 0;

  displaySong(userSongs?.song);
  setPlayerDisplay();
  pauseSong();
  setPlayButtonAccessibleText();
};

const shuffleSong = document.querySelector(".shuffle");

shuffleSong.addEventListener("click", shuffle);

const deleteSong = (id) => {
  if (userSongs?.currentSong?.id === id) {
    userSongs.currentSong = null;
    userSongs.currentSongTime = 0;
    pauseSong();
    setPlayerDisplay();
  }
  // console.log(userSongs?.currentSong?.id === id)

  userSongs.song = userSongs.song.filter((song) => song.id !== id);
  displaySong(userSongs?.song);
  highlight();
  setPlayButtonAccessibleText();
};

const resetPlayList = () => {
  if (userSongs?.song.length === 0) {
    userSongs.song = [...allSongs];
    displaySong(sortSong());
    console.log("hello");
  }
};

const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", () => {
  resetPlayList();
});

audio.addEventListener("ended", () => {
  const currentSongIndex = getIndexOfCurrentSong();
  const nextSongExists = userSongs.song[currentSongIndex + 1] !== undefined;
  if (nextSongExists) {
    nextSong();
  } else {
    userSongs.currentSong = null;
    userSongs.currentSongTime = 0;
  }
  setPlayerDisplay();
  pauseSong();
  highlight();
});
