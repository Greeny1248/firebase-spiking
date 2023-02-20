import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import useSound from "use-sound";
import "./App.css";
import handleSubmit from "./handles/handlesubmit";
import { collection, getDocs } from "firebase/firestore";
import { useRef, useState, useEffect, useCallback } from "react";
import { firestore } from "./firebase_setup/firebase";
import SynthEngine from "./components/Synth";
import Sequencer from "./sequencer";
import PlayerProvider from "./player-provider";


function App() {
  const [todos, setTodos] = useState([]);
  const fetchPost = async () => {
    await getDocs(collection(firestore, "test_data")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const dataRef = useRef();
  const submithandler = (e) => {
    e.preventDefault();
    handleSubmit(dataRef.current.value);
    dataRef.current.value = "";
  };
  //////////////////////////////////External synth keyboard//////////////////////////////////////////////
  const [playSound1] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/140-bpm-amen-break-original-processed-6945.mp3?alt=media&token=399fc329-1afe-44c4-9fa6-7ff971544948"
  );
  const [playSound2] = useSound("");
  const [playSound3] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/old-school-hip-hop-drumloop-105bpm-125946.mp3?alt=media&token=c7e25969-e4a5-4d67-8e35-b8368baa1c38"
  );
  const [playSound4] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/phonk-house-drum-loop_130bpm_D_minor.mp3?alt=media&token=089643a5-abd3-41fd-a5a3-586f79a259c7"
  );
  const [playSound5] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/typical-trap-loop-2b-130751.mp3?alt=media&token=e6fd4b36-90c7-4bf3-94ef-38f0744da95e"
  );
  const [playSound6] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/stinger-sound-cmaj7-chord-stab-12534.mp3?alt=media&token=31278a3f-df90-4e2d-9020-b5be9e570f1b"
  );
  const [playSound7] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/zoom-down-by-prettysleepy-art-11782.mp3?alt=media&token=c93783f5-546e-4be6-8bc4-ebb7ef7991ee"
  );
  const [playSound8] = useSound();
  const [playSound9] = useSound();
  const [playSoundz] = useSound("http://localhost:3000/14c181c6-7046-41da-a780-9a83eb788481");

   ///////////////////////////////////MODULATION//////////////////////////////////////////////
   const soundUrl =
   "https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/stinger-sound-cmaj7-chord-stab-12534.mp3?alt=media&token=31278a3f-df90-4e2d-9020-b5be9e570f1b";
   
  
  const [playbackRate, setPlaybackRate] = useState(1);
  
  
  const [play] = useSound(soundUrl, {
    playbackRate,
    volume: 0.5,
  });
  
  const handleClickQ = () => {
    setPlaybackRate(1)
    play();   
  };
  const handleClickW = () => {
    setPlaybackRate(1.1)
    play() ;
    
  };
  const handleClickE = () => {
    setPlaybackRate(1.2)
    play();
    
  };
  const handleClickR = () => {
    setPlaybackRate(1.3)
    play();
    
  };
  const onKeyPress = useCallback((event) => {
    console.log(`Key pressed: ${event.key}`);
    if (event.key === "1") playSound1();
    if (event.key === "2") playSound2();
    if (event.key === "3") playSound3();
    if (event.key === "4") playSound4();
    if (event.key === "5") playSound5();
    if (event.key === "6") playSound6();
    if (event.key === "7") playSound7();
    if (event.key === "q") handleClickQ();
    if (event.key === "w") handleClickW();
    if (event.key === "e") handleClickE();
    if (event.key === "r") handleClickR();
  }, []);
  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", onKeyPress);
    
    // remove the event listener
    return () => {
      // document.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);
 
  console.log(playbackRate, "pb0")
  var context;
  window.addEventListener("load", init, false);
  function init() {
    try {
      context = new AudioContext();
    } catch (e) {
      alert("Web Audio API is not supported in this browser");
    }
  }

  // const audioElement = document.querySelector("audio");

  // // pass it into the audio context
  // const track = audioContext.createMediaElementSource(audioElement);




  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    console.log(audio.src , "audio.src")
  };




































  return (
    <div className="App">
          <PlayerProvider>
      {({ player }) => {
        if (!player) {
          return <p>loading....</p>;
        }
        return <Sequencer player={player} />;
      }}
    </PlayerProvider>
      {/* <audio href="https://firebasestorage.googleapis.com/v0/b/fir-with-react-c4cc3.appspot.com/o/140-bpm-amen-break-original-processed-6945.mp3?alt=media&token=399fc329-1afe-44c4-9fa6-7ff971544948"  ></audio>  */}
      
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <br />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
      <br />
    </div>
      <section className="keyboard">
        <section className="drums">
          <div className="keys" onClick={() => playSound1()}>
            1
          </div>
          <div className="keys" onClick={() => playSound2()}>
            2
          </div>
          <div className="keys" onClick={() => playSound3()}>
            3
          </div>
          <div className="keys" onClick={() => playSound4()}>
            4
          </div>
          <div className="keys" onClick={() => playSound5()}>
            5
          </div>
          <div className="keys" onClick={() => playSound6()}>
            6
          </div>
          <div className="keys" onClick={() => playSound7()}>
            7
          </div>
          <div className="keys" onClick={() => playSound8()}>
            8
          </div>
          <div className="keys" onClick={() => playSound9()}>
            9
          </div>
          <div className="keys" onClick={() => playSoundz()}>
            0
          </div>
        </section>
        <section className="qrow">
          <div className="keys" onClick={() => handleClickQ()}>
            q
          </div>
          <div className="keys" onClick={() => handleClickW()}>
            w
          </div>
          <div className="keys" onClick={() => handleClickE()}>
            e
          </div>
          <div className="keys" onClick={() => handleClickR()}>
            r
          </div>
          <div className="keys">t</div>
          <div className="keys">y</div>
          <div className="keys">u</div>
          <div className="keys">i</div>
          <div className="keys">o</div>
          <div className="keys">p</div>
        </section>
        <br></br>
        <section className="arow">
          <div className="keys">a</div>
          <div className="keys">s</div>
          <div className="keys">d</div>
          <div className="keys">f</div>
          <div className="keys">g</div>
          <div className="keys">h</div>
          <div className="keys">j</div>
          <div className="keys">k</div>
          <div className="keys">l</div>
        </section>
        <br></br>
        <section className="zrow">
          <div className="keys" >z</div>
          <div className="keys">x</div>
          <div className="keys">c</div>
          <div className="keys">v</div>
          <div className="keys">b</div>
          <div className="keys">n</div>
          <div className="keys">m</div>
        </section>
      </section>
      {/* <SynthEngine/> */}
      {/* <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
        </form>
      
  
      <ul>
        {todos.map((item) => {
          return <li key={item.id}>{item.testData}</li>;
        })}
      </ul> */}
    </div>
  );
}
export default App;
