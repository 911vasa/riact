import React, {Component} from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import SearchBar from './component/search_bar';
import VideoList from './component/video_list';
import VideoDetail from './component/video_detail';
import YTSearch from 'youtube-api-search';
import FetchHttpClient, { json } from 'fetch-http-client';

const API_KEY = 'AIzaSyB_v3IWlEc8XbOXl0M2uGaw4wT8x1Jb8ss';
const client = new FetchHttpClient('https://test.betedo.com/');

class App extends Component {

   queryEvent = {phone_number: 123454454};

    constructor(props) {
        super(props);
        this.state = {videos: [] , selectedVideo: null };
        console.log(this.queryEvent);
        this.queryEvent =  JSON.stringify(this.queryEvent);
        client.addMiddleware(request => {
            request.options.headers['Content-Type'] = 'application/json';
        });

        client.addMiddleware(json());
        client.post('tadiran/public/api/check-number', this.queryEvent).then(response => console.log(response.jsonData));

    }



    videoSearch(term){

        YTSearch({ key: API_KEY, term: term  },  (videos) => {
            console.log(videos ,'asdd')
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });

    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)} , 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}
ReactDOM.render(<App/>, document.querySelector('.container'));