import image1 from "../assets/images/image1.png";
import IconText from "../components/shared/iconText";
import { Icon } from "@iconify/react/dist/iconify.js";
import TextWithHover from "../components/shared/textWithHover";

const focusCardsData = [
  {
      title: "Peaceful Piano",
      description: "Relax and indulge with beautiful piano pieces",
      imgUrl: "https://images.unsplash.com/photo-1517578099694-8b23adec837c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "",
      description: "Keep calm and focus with this music",
      imgUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "Instrumental Study",
      description: "Focus with soft study music in the background.",
      imgUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "Focus Flow",
      description: "Up tempo instrumental hip hop beats",
      imgUrl: "https://images.unsplash.com/photo-1524578471438-cdd96d68d82c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "Beats to think to",
      description: "Focus with deep techno and tech house",
      imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const rhythmPlaylistsCardData = [
  {
      title: "Relax and listen",
      description: "Relaxing songs",
      imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
      title: "Heartbreak",
      description: "Slow songs with great music",
      imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
      title: "Happy Happy",
      description: "Light hiphop songs",
      imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
      title: "Rock",
      description: "Rock music",
      imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
      title: "Classic",
      description: "old musical melodies",
      imgUrl: "https://plus.unsplash.com/premium_photo-1682125816787-4db071ef2da8?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const SoundOfIndiaCardsData = [
  {
      title: "Soul of India",
      description: "Songs which touches your heart",
      imgUrl: "https://images.unsplash.com/photo-1633411988188-6e63354a9019?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "Bollywood Bash",
      description: "Slow songs with great music",
      imgUrl: "https://images.unsplash.com/photo-1461784229652-c9271a46d4c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "My Marathi",
      description: "Enjoy regional language",
      imgUrl: "https://images.unsplash.com/photo-1483032469466-b937c425697b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "Old Melodies",
      description: "Rock music",
      imgUrl: "https://images.unsplash.com/photo-1510511450816-30c68106b199?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
      title: "90's Classic hits",
      description: "old musical melodies",
      imgUrl: "https://plus.unsplash.com/premium_photo-1682125893394-7372df580472?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Home = () => {
  return (
    <div className="h-full w-full flex">
      {/* This first div will be the left panel */}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        {/* This div is for logo */}
        <div>
          <div className="logoDiv p-6">
            <img 
            src={image1} 
            alt="rhythm logo" 
            width={500} />
          </div>
          <div className="py-2">
            <IconText
              iconName={"material-symbols:home"}
              displayText={"Home"}
              active
            />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
          </div>

          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create Playlist"}
            />
            <IconText
              iconName={"mdi:cards-heart"}
              displayText={"Liked Songs"}
            />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
            <Icon icon="carbon:earth-europe-africa" />
            <div className="ml- text-sm font-semibold pt-1">English</div>
          </div>
        </div>
      </div>

      {/* This second div will be the right part(main content) */}
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-3/5 flex justify-around items-center">
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-1/2 border-r border-white"></div>
            </div>
            <div className="w-2/5 flex justify-around h-full items-center">
              <TextWithHover displayText={"Register"} />
              <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                Log in
              </div>
            </div>
          </div>
        </div>

        <div className="content p-8 pt-0 overflow-auto">
          \
          <PlaylistView 
          titleText="Focus" 
          cardsData={focusCardsData} />
          <PlaylistView
          titleText="Rhythm Playlists"
          cardsData={rhythmPlaylistsCardData}
          />
          <PlaylistView 
          titleText="Sound of India" 
          cardsData={SoundOfIndiaCardsData} />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
          // cardsData will be an array
          cardsData.map((item, index) => {
            return (
              <Card
              key={item.id || index}
              title={item.title + index}
              description={item.description}
              imgUrl={item.imgUrl}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({title, description, imgUrl}) => {
  return (
      <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
          <div className="pb-4 pt-2">
            <img className="w-full" src={imgUrl}
            alt="label"/>
            </div>
        
          <div className="text-white font-semibold py-3">{title}</div>
          <div className="text-gray-500 text-sm">{description}</div>
      
      </div>
  );
};

export default Home;

//<img className="w-full rounded-md" src={imageUrl} alt="label" />
