<template>
    <div>
        <h1>
            GAME PLAY
        </h1>
        <canvas id="tutorial" width="150" height="150"></canvas>
        <button @click="play">Play</button>
    </div>
</template>

<script>
export default {
    created () {
        function draw() {
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
        }
      }
    },
    methods : {
        play () {
            console.log('1')
            
            var audio = new Audio('@/assets/backsoundlobby.mp3')
            function resolveAfter2Seconds() {
                return new Promise(resolve => {
                    console.log('2')
                    audio.play()
                });
            }

            async function asyncCall() {
                console.log('calling');
                var result = await resolveAfter2Seconds();
                // console.log(result);
                console.log('3')
                // expected output: 'resolved'
            }
            console.log('4')
            asyncCall();
            console.log('5')
        }
    }
}
</script>

<style scopped>
 canvas { border: 1px solid black; }
</style>
