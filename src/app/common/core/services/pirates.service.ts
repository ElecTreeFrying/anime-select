import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PiratesService {

  public dataConfig  = {
    data: {
      name: 'Synopsis',
      image: 'https://vignette2.wikia.nocookie.net/onepiece/images/0/0e/Volume_1.png/revision/latest/scale-to-width-down/250?cb=20130115020528',
      description: `
      <div>
        <p>
          22 years ago, the Pirate King, Gol D. Roger, was executed. However, before his death he revealed to everyone that his treasure, the One Piece, was hidden at the end of the Grand Line. This inspired people to become pirates and sail toward the treasure, beginning the Great Age of Pirates. Twelve years later, a young boy named Monkey D. Luffy dreamed of finding the One Piece, but lost the ability to swim after eating a Devil Fruit giving him the ability to stretch his body like rubber. He was given a straw hat by the pirate Shanks, who would later go on to become a Yonko, one of the four most powerful pirates in the world, on the agreement that he would return the hat once he became a pirate and surpassed Shanks.
          <br><br>
          Ten years passed, and Luffy set off to sea at the age of 17. His infamy began to grow as he formed the Straw Hat Pirates and defeated some of the East Blue's most notorious pirates. He recruited four crewmates: Roronoa Zoro, who sought to become the greatest swordsman in the world, Usopp, who sought to become a brave warrior of the sea, Sanji, who sought to find a hidden sea known as the All Blue, and Nami, who sought to make a map of the world.
          <br><br>
          He entered the Grand Line with a bounty of <span><img src="https://vignette4.wikia.nocookie.net/onepiece/images/d/de/Beli.png/revision/latest?cb=20141206091723"></span>30,000,000 and was pursued by Smoker of the Marines. In the Grand Line, Luffy and the Straw Hat Pirates became involved in a plot to dismantle the criminal organization Baroque Works, led by Crocodile of the Shichibukai, seven pirates who work for the World Government. The Straw Hats defeated Crocodile and dismantled Baroque Works, earning the attention of higher-ranked officials in the World Government. They gained two crewmates in the process, Tony Tony Chopper, who sought to cure every illness, and the mysterious Nico Robin, formerly the second in command of Baroque Works.
          <br><br>
          The Straw Hats continued sailing through the Grand Line, but the conditions caused their ship the Going Merry to take irreparable damage. Also, Robin turned herself in to the government in order to save the Straw Hats from being annihilated. However, Luffy and his crew refused to let her go and invaded the judicial island Enies Lobby, defeating the powerful group of government assassins known as CP9. During the battle, it was revealed that Robin sought to find out about a lost 100 years of history which the World Government does not want to be revealed. The Straw Hats succeeded in rescuing Robin, but the Going Merry was ultimately destroyed after they escaped. However, they gained a new crewmate in Franky, who wanted to build a ship to go around the world, and he built them the Thousand Sunny. The destruction of Enies Lobby caused the Straw Hats to be seen as even more of a threat, and every crew member received a bounty.
          <br><br>
          The Straw Hats sailed into the Florian Triangle, where they encountered Brook, a skeleton who wanted to reunite with Laboon, a whale his old crew was friends with many decades ago. The Straw Hats defeated another Shichibukai, Gekko Moriah, and Brook joined their crew. Meanwhile, a pirate known as Blackbeard captured Portgas D. Ace, Luffy's adopted brother, and turned him in to the government to be executed. The Straw Hats went to the Sabaody Archipelago, alongside nine other pirates with bounties over <span><img src="https://vignette4.wikia.nocookie.net/onepiece/images/d/de/Beli.png/revision/latest?cb=20141206091723"></span>100,000,000 known as the Eleven Supernovas. However, chaos erupted due to Luffy punching a World Noble. The Shichibukai Bartholomew Kuma and robot replicas of himself overwhelmed the Straw Hats and sent them flying to different islands all around the world. Separated from his crew, Luffy decided to go save Ace from his impending execution.
          <br><br>
          Luffy managed to break into Impel Down, the government's top prison facility, but failed to reach Ace in time. He then led a mass breakout, and the other prisoners helped him reach Marineford, where Ace is set to be executed. War broke out in Marineford as Whitebeard, one of the Yonko and Ace's captain, led his crew in a battle against the Marines, and they were later joined by Luffy and the Impel Down prisoners. Luffy was revealed to be the son of Monkey D. Dragon, the leader of a band of revolutionaries seeking to bring down the World Government, and Ace was revealed to be Roger's son. Luffy managed to free Ace, but Ace was killed after saving Luffy from Admiral Akainu. Luffy was taken out of the battlefield as Whitebeard was overwhelmed by the Marines. Suddenly, Blackbeard arrived with his crew, killed Whitebeard, and took his Devil Fruit power. Shanks then arrived and ended the war.
          <br><br>
          Anguished by his inability to save Ace, Luffy sent a message to his crew telling them to train and grow stronger for two years.
          <br><br>
          Two years later, the Straw Hats returned to the Grand Line and entered the New World. In the New World, they formed an alliance with Trafalgar Law, one of the Eleven Supernovas, who sought to bring down Kaido of the Yonko. They traveled through Punk Hazard and Dressrosa in order to destroy factories supplying artificial Devil Fruits to Kaido, and took down the Shichibukai Donquixote Doflamingo in the process.
        </p>
      </div>
      `,
    }
  };

  constructor(private http: HttpClient) { }

  getPirates_v1() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=15&page%5Boffset%5D=405'); }
  getPirates_v2() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=420'); }
  getPirates_v3() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=440'); }
  getPirates_v4() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=460'); }
  getPirates_v5() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=480'); }

  getPirates_v6() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=500'); }
  getPirates_v7() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=520'); }
  getPirates_v8() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=540'); }
  getPirates_v9() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=560'); }
  getPirates_v10() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=580'); }

  getPirates_v11() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=600'); }
  getPirates_v12() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=620'); }
  getPirates_v13() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=640'); }
  getPirates_v14() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=660'); }
  getPirates_v15() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=680'); }

  getPirates_v16() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=700'); }
  getPirates_v17() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=720'); }
  getPirates_v18() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=740'); }
  getPirates_v19() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=760'); }
  getPirates_v20() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=780'); }

  getPirates_v21() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=800'); }
  getPirates_v22() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=820'); }
  getPirates_v23() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=840'); }
  getPirates_v24() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=860'); }
  getPirates_v25() { return this.http.get('https://kitsu.io/api/edge/characters?page%5Blimit%5D=20&page%5Boffset%5D=880'); }

}
